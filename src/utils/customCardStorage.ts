import { Card } from '../types';
import { CARDS_DATABASE } from '../data/cards';

const DB_NAME = 'NexusTCG_Storage';
const DB_VERSION = 1;
const STORE_NAME = 'custom_cards';
const LOCAL_STORAGE_KEY = 'nexus_custom_cards';

// In-memory cache for synchronous access
let memoryCustomCards: Card[] = [];
let isDbInitialized = false;

/**
 * Open or upgrade IndexedDB database for unlimited card & high-res image storage
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get all cards currently in IndexedDB
 */
async function getAllFromIndexedDB(): Promise<Card[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve((request.result as Card[]) || []);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[Storage] IndexedDB read failed, falling back to cache:', err);
    return [];
  }
}

/**
 * Put an array of cards into IndexedDB in a single atomic transaction
 */
async function putBatchToIndexedDB(cards: Card[]): Promise<void> {
  if (!cards.length) return;
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      cards.forEach(card => {
        store.put(card);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (err) {
    console.warn('[Storage] IndexedDB batch write failed:', err);
  }
}

/**
 * Creates a lightweight copy of a card suitable for localStorage (strips giant base64 data URLs)
 */
function sanitizeCardForLocalStorage(card: Card): Card {
  if (card.artUrl && card.artUrl.startsWith('data:') && card.artUrl.length > 25000) {
    // Keep essential metadata, substitute generic high-performance preview placeholder in localStorage
    return {
      ...card,
      artUrl: '' // Full artUrl remains authoritative in IndexedDB
    };
  }
  return card;
}

/**
 * Safely persists cards to localStorage without throwing QuotaExceededError
 */
function safeSaveToLocalStorage(cards: Card[]) {
  try {
    // Prune huge base64 strings from localStorage to avoid 5MB quota exhaustion
    const sanitized = cards.map(sanitizeCardForLocalStorage);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
  } catch (err: any) {
    // If quota exceeded, clean up bloated data in localStorage since IndexedDB holds full fidelity
    console.warn('[Storage] LocalStorage quota reached; relying on IndexedDB for authoritative storage.');
    try {
      // Store only the 10 most recent cards in localStorage as a lightweight fast boot cache
      const minimal = cards.slice(0, 10).map(c => ({
        id: c.id,
        name: c.name,
        domain: c.domain,
        cardType: c.cardType,
        rarity: c.rarity,
        cost: c.cost,
        power: c.power,
        defense: c.defense,
        abilities: c.abilities || [],
        powerGlyphs: c.powerGlyphs || []
      }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(minimal));
    } catch {
      // If even that fails, remove the key to unblock other browser operations
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
}

/**
 * Synchronous read from localStorage/memory for immediate app initialization
 */
export function getCustomCardsSync(): Card[] {
  if (memoryCustomCards.length > 0) {
    return memoryCustomCards;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed: Card[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryCustomCards = parsed.filter(c => c && c.id);
        return memoryCustomCards;
      }
    }
  } catch (e) {
    console.warn('[Storage] Error reading initial cards from localStorage:', e);
  }

  return [];
}

/**
 * Initialize storage on app startup:
 * 1. Reads IndexedDB
 * 2. Migrates any existing legacy cards from localStorage to IndexedDB
 * 3. Updates in-memory cache
 */
export async function initCustomCardStorage(): Promise<Card[]> {
  const fromIdb = await getAllFromIndexedDB();
  const idbMap = new Map<string, Card>();
  fromIdb.forEach(c => {
    if (c && c.id) idbMap.set(c.id, c);
  });

  // Check localStorage for any cards not yet in IndexedDB
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed: Card[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cardsToMigrate: Card[] = [];
        parsed.forEach(c => {
          if (c && c.id && !idbMap.has(c.id)) {
            idbMap.set(c.id, c);
            cardsToMigrate.push(c);
          }
        });

        // Migrate to IndexedDB
        if (cardsToMigrate.length > 0) {
          await putBatchToIndexedDB(cardsToMigrate);
        }
      }
    }
  } catch (e) {
    console.warn('[Storage] Legacy localStorage migration notice:', e);
  }

  const merged = Array.from(idbMap.values());
  memoryCustomCards = merged;
  isDbInitialized = true;

  // Safely write sanitized cache to localStorage
  safeSaveToLocalStorage(merged);

  return merged;
}

/**
 * Save a single custom card with automatic IndexedDB persistence and safe localStorage mirroring
 */
export async function saveCustomCard(card: Card): Promise<void> {
  // Update in-memory cache
  const filtered = memoryCustomCards.filter(c => c.id !== card.id);
  memoryCustomCards = [card, ...filtered];

  // Save to IndexedDB (authoritative, unlimited quota)
  await putBatchToIndexedDB([card]);

  // Safely mirror to localStorage
  safeSaveToLocalStorage(memoryCustomCards);
}

/**
 * Save multiple custom cards in a single batch transaction
 */
export async function saveCustomCardsBatch(newCards: Card[]): Promise<void> {
  if (!newCards.length) return;

  const newIds = new Set(newCards.map(c => c.id));
  const filtered = memoryCustomCards.filter(c => !newIds.has(c.id));
  memoryCustomCards = [...newCards, ...filtered];

  // Atomic batch write to IndexedDB
  await putBatchToIndexedDB(newCards);

  // Safely mirror to localStorage
  safeSaveToLocalStorage(memoryCustomCards);
}

/**
 * Delete a custom card by ID
 */
export async function deleteCustomCard(cardId: string): Promise<void> {
  memoryCustomCards = memoryCustomCards.filter(c => c.id !== cardId);

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(cardId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[Storage] IndexedDB delete error:', err);
  }

  safeSaveToLocalStorage(memoryCustomCards);
}

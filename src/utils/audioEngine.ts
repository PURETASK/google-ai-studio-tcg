// Procedural Ambient Audio Engine for Realm of Nexus TCG
// Utilizes Web Audio API to generate domain soundscapes, tactical battle sounds, player entrances, and UI micro-haptics

export type DomainAudioTheme = 'Radiance' | 'Arcane' | 'Verdance' | 'Abyss' | 'Sanctuary' | 'Neutral';

class NexusAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.4;
  private currentDroneNodes: { oscList: OscillatorNode[]; gainNode: GainNode; filterNode: BiquadFilterNode; noiseSource?: AudioNode } | null = null;
  private currentTheme: DomainAudioTheme | null = null;
  private isInitialized: boolean = false;
  private analyserNode: AnalyserNode | null = null;

  constructor() {
    // Lazy initialize on first user gesture
  }

  public initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.analyserNode = this.ctx.createAnalyser();
        this.analyserNode.fftSize = 64;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isInitialized = true;
    return this.ctx;
  }

  public getAudioContext(): AudioContext | null {
    return this.ctx;
  }

  public getAnalyser(): AnalyserNode | null {
    if (!this.analyserNode && this.ctx) {
      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;
    }
    return this.analyserNode;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.currentDroneNodes) {
      this.stopDrone();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentDroneNodes && this.ctx) {
      this.currentDroneNodes.gainNode.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume * 0.15,
        this.ctx.currentTime,
        0.1
      );
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // Play micro UI click / hover sound
  public playMicroSound(type: 'hover' | 'click' | 'select' | 'error' | 'equip' | 'unlock' | 'cardFlip' | 'manaSpend' | 'shimmer') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      if (this.analyserNode) {
        gain.connect(this.analyserNode);
        this.analyserNode.connect(this.ctx.destination);
      } else {
        gain.connect(this.ctx.destination);
      }

      const baseVol = this.volume * 0.12;

      switch (type) {
        case 'hover':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(420, now);
          osc.frequency.exponentialRampToValueAtTime(620, now + 0.05);
          gain.gain.setValueAtTime(baseVol * 0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;

        case 'click':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);
          gain.gain.setValueAtTime(baseVol * 0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;

        case 'select':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.setValueAtTime(440, now + 0.04);
          osc.frequency.setValueAtTime(660, now + 0.08);
          gain.gain.setValueAtTime(baseVol * 0.7, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          osc.start(now);
          osc.stop(now + 0.18);
          break;

        case 'equip':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
          gain.gain.setValueAtTime(baseVol, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;

        case 'unlock':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
          osc.frequency.setValueAtTime(1046.50, now + 0.21); // C6
          gain.gain.setValueAtTime(baseVol * 0.9, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
          break;

        case 'error':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.setValueAtTime(140, now + 0.08);
          gain.gain.setValueAtTime(baseVol * 0.6, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;

        case 'cardFlip':
          // Smooth paper / foil swoosh
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(680, now + 0.06);
          osc.frequency.exponentialRampToValueAtTime(240, now + 0.12);
          gain.gain.setValueAtTime(baseVol * 0.7, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
          break;

        case 'manaSpend':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(784, now);
          osc.frequency.exponentialRampToValueAtTime(392, now + 0.14);
          gain.gain.setValueAtTime(baseVol * 0.75, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
          break;

        case 'shimmer':
          [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, idx) => {
            const shOsc = this.ctx!.createOscillator();
            const shGain = this.ctx!.createGain();
            shOsc.type = 'sine';
            shOsc.frequency.setValueAtTime(freq, now + idx * 0.04);
            shGain.gain.setValueAtTime(baseVol * 0.4, now + idx * 0.04);
            shGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + idx * 0.04);
            shOsc.connect(shGain);
            shGain.connect(this.ctx!.destination);
            shOsc.start(now + idx * 0.04);
            shOsc.stop(now + 0.25 + idx * 0.04);
          });
          break;
      }
    } catch {
      // Ignore audio errors silently
    }
  }

  // Play Dice Roll Clatter and Result Ding
  public playDiceRoll() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseVol = this.volume * 0.18;

      // 4 quick clatter taps
      [0, 0.04, 0.09, 0.15].forEach((t, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350 + Math.random() * 200, now + t);
        osc.frequency.exponentialRampToValueAtTime(150, now + t + 0.03);
        gain.gain.setValueAtTime(baseVol * (0.5 + i * 0.15), now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.04);
      });

      // Landing chime
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(880, now + 0.22);
      bell.frequency.exponentialRampToValueAtTime(440, now + 0.45);
      bellGain.gain.setValueAtTime(baseVol * 0.8, now + 0.22);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      bell.connect(bellGain);
      bellGain.connect(this.ctx.destination);
      bell.start(now + 0.22);
      bell.stop(now + 0.5);
    } catch {}
  }

  // Play Grand Player Entrance Fanfare & Warhorn based on Domain
  public playPlayerEntrance(domain: DomainAudioTheme, isOpponent: boolean = false) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseVol = this.volume * 0.35;

      switch (domain) {
        case 'Radiance': {
          // Fiery battle horn + volcanic percussion
          const horn1 = this.ctx.createOscillator();
          const horn2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          horn1.type = 'sawtooth';
          horn2.type = 'triangle';
          horn1.frequency.setValueAtTime(isOpponent ? 146.83 : 196.00, now); // D3 or G3
          horn1.frequency.linearRampToValueAtTime(isOpponent ? 220.00 : 293.66, now + 0.4);
          horn2.frequency.setValueAtTime(isOpponent ? 220.00 : 293.66, now);
          horn2.frequency.linearRampToValueAtTime(isOpponent ? 293.66 : 392.00, now + 0.4);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(baseVol, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

          horn1.connect(gain);
          horn2.connect(gain);
          gain.connect(this.ctx.destination);

          horn1.start(now);
          horn2.start(now);
          horn1.stop(now + 0.9);
          horn2.stop(now + 0.9);
          break;
        }

        case 'Sanctuary': {
          // Angelic golden chord + triumphant chime
          [261.63, 329.63, 392.00, 523.25].forEach((f, idx) => {
            const osc = this.ctx!.createOscillator();
            const g = this.ctx!.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + idx * 0.08);
            g.gain.setValueAtTime(0.01, now + idx * 0.08);
            g.gain.linearRampToValueAtTime(baseVol * 0.7, now + idx * 0.08 + 0.1);
            g.gain.exponentialRampToValueAtTime(0.001, now + 1.1 + idx * 0.08);

            osc.connect(g);
            g.connect(this.ctx!.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + 1.2);
          });
          break;
        }

        case 'Verdance': {
          // Deep earth primeval horn
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(110, now);
          osc.frequency.linearRampToValueAtTime(164.81, now + 0.3);
          osc.frequency.linearRampToValueAtTime(220, now + 0.6);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(baseVol * 0.85, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 1.0);
          break;
        }

        case 'Arcane': {
          // Cosmic temporal glissando sweep
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(1320, now + 0.5);
          osc.frequency.exponentialRampToValueAtTime(440, now + 0.9);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(baseVol * 0.75, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 1.0);
          break;
        }

        case 'Abyss': {
          // Tolling doom bell & dark void pulse
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(65.41, now); // C2
          osc.frequency.exponentialRampToValueAtTime(48.99, now + 0.7);

          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(baseVol * 1.1, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 1.2);
          break;
        }

        default: {
          // Standard battlefield fanfare
          [440, 554.37, 659.25].forEach((f, i) => {
            const osc = this.ctx!.createOscillator();
            const g = this.ctx!.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + i * 0.1);
            g.gain.setValueAtTime(0.01, now + i * 0.1);
            g.gain.linearRampToValueAtTime(baseVol * 0.6, now + i * 0.1 + 0.05);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + i * 0.1);

            osc.connect(g);
            g.connect(this.ctx!.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + 0.9);
          });
        }
      }
    } catch {}
  }

  // Titan Boss Enrage Roar & Cataclysm Strike
  public playTitanRoar(bossId?: string) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseVol = this.volume * 0.45;

      // Sub-bass impact
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(140, now);
      sub.frequency.exponentialRampToValueAtTime(35, now + 0.6);
      subGain.gain.setValueAtTime(baseVol, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 0.8);

      // Tremor noise sweep
      this.triggerProceduralCrackle(now);
    } catch {}
  }

  // Play Domain Soundscape on card inspect or battle start
  public playDomainSoundscape(domain: DomainAudioTheme) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.stopDrone();
      this.currentTheme = domain;

      const now = this.ctx.currentTime;
      const gainNode = this.ctx.createGain();
      const filterNode = this.ctx.createBiquadFilter();

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.14, now + 1.5);

      gainNode.connect(filterNode);
      if (this.analyserNode) {
        filterNode.connect(this.analyserNode);
        this.analyserNode.connect(this.ctx.destination);
      } else {
        filterNode.connect(this.ctx.destination);
      }

      const oscList: OscillatorNode[] = [];

      switch (domain) {
        case 'Radiance': {
          filterNode.type = 'lowpass';
          filterNode.frequency.setValueAtTime(450, now);

          const freqs = [65.41, 130.81, 196.00]; // C2, C3, G3
          freqs.forEach((f, idx) => {
            const osc = this.ctx!.createOscillator();
            osc.type = idx === 0 ? 'sawtooth' : 'triangle';
            osc.frequency.setValueAtTime(f, now);
            osc.connect(gainNode);
            osc.start(now);
            oscList.push(osc);
          });

          this.triggerProceduralCrackle(now);
          break;
        }

        case 'Arcane': {
          filterNode.type = 'bandpass';
          filterNode.frequency.setValueAtTime(800, now);
          filterNode.Q.setValueAtTime(3, now);

          const freqs = [110, 220, 329.63, 440]; // A2, A3, E4, A4
          freqs.forEach((f) => {
            const osc = this.ctx!.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now);
            osc.frequency.linearRampToValueAtTime(f * 1.01, now + 4);
            osc.connect(gainNode);
            osc.start(now);
            oscList.push(osc);
          });
          break;
        }

        case 'Verdance': {
          filterNode.type = 'lowpass';
          filterNode.frequency.setValueAtTime(320, now);

          const freqs = [82.41, 164.81, 246.94]; // E2, E3, B3
          freqs.forEach((f) => {
            const osc = this.ctx!.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now);
            osc.connect(gainNode);
            osc.start(now);
            oscList.push(osc);
          });
          break;
        }

        case 'Abyss': {
          filterNode.type = 'lowpass';
          filterNode.frequency.setValueAtTime(220, now);

          const freqs = [55.00, 77.78, 110.00]; // A1, Eb2 (tritone), A2
          freqs.forEach((f, idx) => {
            const osc = this.ctx!.createOscillator();
            osc.type = idx === 1 ? 'sawtooth' : 'sine';
            osc.frequency.setValueAtTime(f, now);
            osc.connect(gainNode);
            osc.start(now);
            oscList.push(osc);
          });
          break;
        }

        case 'Sanctuary': {
          filterNode.type = 'highpass';
          filterNode.frequency.setValueAtTime(200, now);

          const freqs = [130.81, 261.63, 329.63, 392.00]; // C3, C4, E4, G4
          freqs.forEach((f) => {
            const osc = this.ctx!.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now);
            osc.connect(gainNode);
            osc.start(now);
            oscList.push(osc);
          });
          break;
        }

        case 'Neutral':
        default: {
          filterNode.type = 'bandpass';
          filterNode.frequency.setValueAtTime(400, now);

          const freqs = [98.00, 146.83, 196.00]; // G2, D3, G3
          freqs.forEach((f) => {
            const osc = this.ctx!.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now);
            osc.connect(gainNode);
            osc.start(now);
            oscList.push(osc);
          });
          break;
        }
      }

      this.currentDroneNodes = {
        oscList,
        gainNode,
        filterNode
      };
    } catch {}
  }

  private triggerProceduralCrackle(startTime: number) {
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() < 0.03 ? (Math.random() * 2 - 1) * 0.4 : 0;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1500, startTime);

      const crackleGain = this.ctx.createGain();
      crackleGain.gain.setValueAtTime(this.volume * 0.08, startTime);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

      whiteNoise.connect(filter);
      filter.connect(crackleGain);
      crackleGain.connect(this.ctx.destination);

      whiteNoise.start(startTime);
    } catch {}
  }

  public stopDrone(fadeDuration: number = 0.8) {
    if (!this.currentDroneNodes || !this.ctx) return;
    try {
      const { oscList, gainNode } = this.currentDroneNodes;
      const now = this.ctx.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);

      setTimeout(() => {
        oscList.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
      }, fadeDuration * 1000 + 100);

      this.currentDroneNodes = null;
      this.currentTheme = null;
    } catch {
      this.currentDroneNodes = null;
    }
  }

  // Combat clash sound effect
  public playCombatClash(type: 'attack' | 'shield' | 'spell' | 'slay' | 'turnStart' | 'victory') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseVol = this.volume * 0.25;

      switch (type) {
        case 'attack': {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(600, now);
          osc1.frequency.exponentialRampToValueAtTime(120, now + 0.12);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(180, now);
          osc2.frequency.exponentialRampToValueAtTime(50, now + 0.18);

          gain.gain.setValueAtTime(baseVol, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.2);
          osc2.stop(now + 0.2);
          break;
        }

        case 'shield': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);

          gain.gain.setValueAtTime(baseVol * 0.9, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.35);
          break;
        }

        case 'spell': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(350, now);
          osc.frequency.linearRampToValueAtTime(1050, now + 0.25);

          gain.gain.setValueAtTime(baseVol * 0.8, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.3);
          break;
        }

        case 'slay': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);

          gain.gain.setValueAtTime(baseVol * 1.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.35);
          break;
        }

        case 'turnStart': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(659.25, now + 0.08);

          gain.gain.setValueAtTime(baseVol * 0.6, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.25);
          break;
        }

        case 'victory': {
          [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + i * 0.1);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.setValueAtTime(baseVol * 0.7, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + i * 0.1);

            osc.connect(gain);
            gain.connect(this.ctx!.destination);

            osc.start(now + i * 0.1);
            osc.stop(now + 1.2);
          });
          break;
        }
      }
    } catch {}
  }
}

export const soundEngine = new NexusAudioEngine();

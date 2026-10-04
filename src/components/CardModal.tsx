import React from 'react';
import { Card } from '../types';
import { DeepDiveCardInspector, DeepDiveCardInspectorProps } from './DeepDiveCardInspector';

export interface CardModalProps {
  card: Card | null;
  onClose: () => void;
}

/**
 * CardModal is an upgraded DeepDiveCardInspector with 3D tilt, holographic foil rendering,
 * 5-axis tactical radar polygon chart, and CodexIconRegistry ability icon integration.
 */
export const CardModal: React.FC<CardModalProps> = (props) => {
  return <DeepDiveCardInspector {...props} />;
};

export { DeepDiveCardInspector };

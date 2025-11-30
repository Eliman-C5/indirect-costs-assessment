// frontend/src/interfaces/index.ts

export interface RangeVolume {
  id: string;
  name: string;
  order: number;
}

export interface IndirectCost {
  id: string;
  cost: number;
  rangeVolume: RangeVolume;
}

export interface OperationWithCosts {
  id: string;
  name: string;
  indirectCosts: IndirectCost[];
}

export interface Plant {
  id: string;
  name: string;
}

export interface CostInput {
  rangeVolumeId: string;
  cost: number;
}

export interface SidebarProps {
  plants: Plant[];
  currentPlant: { id: string; name: string };
  setCurrentPlant: (plant: { id: string; name: string }) => void;
  loading: boolean;
}

export interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

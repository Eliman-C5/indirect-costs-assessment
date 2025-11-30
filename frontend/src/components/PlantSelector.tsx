import { ChevronDown, Plus } from 'lucide-react';
import type { Plant } from '../interfaces';

export const PlantSelector = ({
  plants,
  currentPlant,
  setCurrentPlant,
  loading,
  isAddingPlant,
  setIsAddingPlant,
  plantOptions,
}: {
  plants: Plant[];
  currentPlant: { id: string; name: string };
  setCurrentPlant: (plant: { id: string; name: string }) => void;
  loading: boolean;
  isAddingPlant: boolean;
  setIsAddingPlant: (value: boolean) => void;
  plantOptions: { value: string; label: string }[];
}) => {
  return (
    <div className="relative flex items-center gap-1">
      <select
        id="plant-select"
        value={currentPlant.id}
        onChange={(e) => {
          setCurrentPlant({
            id: plants.find((p) => p.id === e.target.value)?.id || '',
            name: plants.find((p) => p.id === e.target.value)?.name || '',
          });
        }}
        className={`w-full px-3 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-800 appearance-none pr-8 ${
          loading ? 'bg-gray-100' : ''
        }`}
        disabled={loading || plants.length === 0}
      >
        {loading && <option value="">...</option>}

        {plants.length === 0 && !loading && <option value="">No hay plantas</option>}

        {plantOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={() => setIsAddingPlant(!isAddingPlant)}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded bg-blue-600 hover:bg-blue-700 transition-colors text-white"
        title="Agregar planta"
      >
        <Plus className="w-5 h-5" />
      </button>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
};

import { useState } from 'react';
import type { SidebarProps } from '../interfaces/index';
import AddPlantModal from './AddPlantModal';
import { PlantSelector } from './PlantSelector';
import { navigationItems } from '../constants';

export default function Sidebar({ plants, loading, setCurrentPlant, currentPlant }: SidebarProps) {
  const [activeItem, setActiveItem] = useState(3);
  const [isAddingPlant, setIsAddingPlant] = useState(false);

  const plantOptions = plants.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <>
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

        <div className="p-4 border-b border-gray-200">
          <label htmlFor="plant-select" className="block text-xs font-semibold text-gray-500 mb-1">
            Planta de Configuración
          </label>

          <PlantSelector
            plants={plants}
            currentPlant={currentPlant}
            setCurrentPlant={setCurrentPlant}
            loading={loading}
            isAddingPlant={isAddingPlant}
            setIsAddingPlant={setIsAddingPlant}
            plantOptions={plantOptions}
          />
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full px-6 py-3 text-left text-sm transition-colors ${
                    activeItem === item.id
                      ? 'bg-gray-100 font-semibold text-gray-900 border-r-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-gray-500 mr-2 font-medium">{item.id}.</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <AddPlantModal isOpen={isAddingPlant} onClose={() => setIsAddingPlant(false)} />
    </>
  );
}

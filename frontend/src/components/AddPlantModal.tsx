import { useEffect, useState } from 'react';
import { useCreatePlant } from '../hooks/useCreatePlant';
import type { AddPlantModalProps } from '../interfaces';

export default function AddPlantModal({ isOpen, onClose }: AddPlantModalProps) {
  const [plantName, setPlantName] = useState('');
  const { createPlant, data } = useCreatePlant();

  const handleSubmit = () => {
    if (plantName.trim()) {
      createPlant({ variables: { name: plantName } });
      setPlantName('');
    }
  };

  const handleClose = () => {
    setPlantName('');
    onClose();
  };

  useEffect(() => {
    if (data) {
      onClose();
    }
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Nueva Planta</h2>

        <input
          type="text"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Escape') handleClose();
          }}
          placeholder="Nombre de la planta"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
          autoFocus
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors font-medium"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

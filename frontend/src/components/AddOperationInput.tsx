import type { OperationWithCosts } from '../interfaces';
import { useCreateOperationRow } from '../hooks/useCreateOperationRow';

export const AddOperationInput = ({
  plantId,
  pricingData,
  setPricingData,
}: {
  plantId: string;
  pricingData: OperationWithCosts[];
  setPricingData: (data: OperationWithCosts[]) => void;
}) => {
  const { handleAddRow, newOperationName, setNewOperationName } = useCreateOperationRow({
    plantId,
    pricingData,
    setPricingData,
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddRow();
    }
  };

  return (
    <div className="mb-6 flex gap-3">
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          placeholder="Nueva operación..."
          value={newOperationName}
          onChange={(e) => setNewOperationName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAddRow}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
        >
          <span className="text-xl">+</span>
        </button>
      </div>
    </div>
  );
};

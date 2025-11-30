import type { OperationWithCosts } from '../interfaces';
import { useHandleCosts } from '../hooks/useHandleCosts';

export const SaveButton = ({ plantId, pricingData }: { plantId: string; pricingData: OperationWithCosts[] }) => {
  const { handleSave, saveCostsLoading } = useHandleCosts({ pricingData, plantId });

  return (
    <button
      onClick={handleSave}
      disabled={saveCostsLoading}
      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
    >
      {saveCostsLoading ? 'Guardando...' : 'Guardar'}
    </button>
  );
};

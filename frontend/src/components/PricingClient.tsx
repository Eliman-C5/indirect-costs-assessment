import type { OperationWithCosts } from '../interfaces';
import OperationIcon from './OperationIcon';
import { useEffect, useState } from 'react';
import { PriceCell } from './PriceCell';
import { AddOperationInput } from './AddOperationInput';
import { SaveButton } from './SaveButton';
import { operationsIcons, weightCategories } from '../constants';
import { useGetOperationWithCosts } from '../hooks/useGetOperationWithCosts';
import { useDeleteOperation } from '../hooks/useDeleteOperation';

export default function PricingTable({ plantId }: { plantId: string }) {
  const { operationsWithCosts } = useGetOperationWithCosts(plantId);
  const { handleDelete } = useDeleteOperation();

  const [pricingData, setPricingData] = useState<OperationWithCosts[]>([]);

  useEffect(() => {
    setPricingData(operationsWithCosts);
  }, [operationsWithCosts]);

    console.log(pricingData);


  return (
    <div className="p-8 bg-gray-50">
      <div className="sticky top-0 flex py-4 justify-end border-b border-gray-200">
        <SaveButton plantId={plantId} pricingData={pricingData} />
      </div>

      <AddOperationInput plantId={plantId} pricingData={pricingData} setPricingData={setPricingData} />

      <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold min-w-52">Operación</th>
              {weightCategories.map((weight) => (
                <th key={weight} className="px-4 py-4 text-center text-sm font-semibold min-w-24">
                  {weight}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {pricingData.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <OperationIcon type={operationsIcons[row.name as keyof typeof operationsIcons]} />
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleDelete(row.id);
                        setPricingData(pricingData.filter((op) => op.id !== row.id));
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Delete operation"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>

                {weightCategories.map((weight) => (
                  <PriceCell
                    key={row.id + weight}
                    pricingData={pricingData}
                    setPricingData={setPricingData}
                    row={row}
                    weight={weight}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

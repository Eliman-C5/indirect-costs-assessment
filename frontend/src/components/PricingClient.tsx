import type { OperationWithCosts } from '../interfaces';
import OperationIcon from './OperationIcon';
import { useEffect, useState } from 'react';
import { PriceCell } from './PriceCell';
import { AddOperationInput } from './AddOperationInput';
import { SaveButton } from './SaveButton';
import { operationsIcons, weightCategories } from '../constants';
import { useGetOperationWithCosts } from '../hooks/useGetOperationWithCosts';

export default function PricingTable({ plantId }: { plantId: string }) {
  const { operationsWithCosts } = useGetOperationWithCosts(plantId);

  const [pricingData, setPricingData] = useState<OperationWithCosts[]>([]);

  useEffect(() => {
    setPricingData(operationsWithCosts);
  }, [operationsWithCosts]);

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
                  <div className="flex items-center gap-3">
                    <OperationIcon type={operationsIcons[row.name as keyof typeof operationsIcons]} />
                    <span className="font-medium text-gray-900">{row.name}</span>
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

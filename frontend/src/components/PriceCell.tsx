import { useState } from 'react';
import type { OperationWithCosts } from '../interfaces';

export const PriceCell = ({
  pricingData,
  setPricingData,
  row,
  weight,
}: {
  pricingData: OperationWithCosts[];
  setPricingData: (data: OperationWithCosts[]) => void;
  row: OperationWithCosts;
  weight: string;
}) => {
  const [editingCell, setEditingCell] = useState<{ rowId: string; weight: string } | null>(null);

  const normalizeWeight = (s: string) => s.replace(/\s+/g, '').toLowerCase();

  return (
    <td
      key={`${row.id}-${weight}`}
      className="px-4 py-4 text-center text-sm text-gray-700"
      onClick={() => setEditingCell({ rowId: row.id, weight })}
    >
      {editingCell?.rowId === row.id && editingCell?.weight === weight ? (
        <input
          type="number"
          step="0.00"
          value={
            row.indirectCosts.find((cost) => normalizeWeight(cost.rangeVolume.name) === normalizeWeight(weight))
              ?.cost
          }
          onChange={(e) => {
            if (e.target.value === '') return;
            const updatedRow = {
              ...row,
              indirectCosts: row.indirectCosts.map((cost) =>
                normalizeWeight(cost.rangeVolume.name) === normalizeWeight(weight)
                  ? { ...cost, cost: parseFloat(e.target.value) }
                  : cost,
              ),
            };
            setPricingData(pricingData.map((r) => (r.id === row.id ? updatedRow : r)));
          }}
          onBlur={() => setEditingCell(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setEditingCell(null);
            if (e.key === 'Escape') setEditingCell(null);
          }}
          autoFocus
          className="w-full px-2 py-1 border border-blue-500 rounded bg-white text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
          {row.indirectCosts
            .find((cost) => normalizeWeight(cost.rangeVolume.name) === normalizeWeight(weight))
            ?.cost.toFixed(2)}
        </span>
      )}
    </td>
  );
};

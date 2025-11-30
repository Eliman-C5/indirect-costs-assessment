import { useMutation } from '@apollo/client/react';
import { SAVE_COSTS } from '../graphql/queries';
import type { OperationWithCosts } from '../interfaces';

export const useHandleCosts = ({
  pricingData,
  plantId,
}: {
  pricingData: OperationWithCosts[];
  plantId: string;
}) => {
  const [saveCosts, { data, loading: saveCostsLoading }] = useMutation(SAVE_COSTS);

  const handleSave = async () => {
    await Promise.all(
      pricingData.map((operation) => {
        saveCosts({
          variables: {
            plantId,
            operationName: operation.name,
            costs: operation.indirectCosts.map((row) => ({ rangeVolumeId: row.rangeVolume.id, cost: row.cost })),
          },
        });
      }),
    );
  };

  return {
    data,
    handleSave,
    saveCostsLoading,
  };
};

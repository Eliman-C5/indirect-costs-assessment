import { useQuery } from '@apollo/client/react';
import type { OperationWithCosts } from '../interfaces';
import { GET_OPERATIONS_WITH_COSTS } from '../graphql/queries';

export const useGetOperationWithCosts = (plantId: string) => {
  const { data, loading, error } = useQuery<{ getOperationsWithCosts: OperationWithCosts[] }>(
    GET_OPERATIONS_WITH_COSTS,
    {
      variables: { plantId },
      skip: !plantId,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    },
  );

  return {
    operationsWithCosts: data?.getOperationsWithCosts || [],
    loading,
    error,
  };
};

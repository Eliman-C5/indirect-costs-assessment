import { useMutation } from '@apollo/client/react';
import { CREATE_OPERATION } from '../graphql/queries';
import { useState } from 'react';
import type { OperationWithCosts } from '../interfaces';

export const useCreateOperationRow = ({
  plantId,
  pricingData,
  setPricingData,
}: {
  plantId: string;
  pricingData: OperationWithCosts[];
  setPricingData: (data: OperationWithCosts[]) => void;
}) => {
  const [createOperation, { data: createOperationData }] = useMutation<{ createOperation: OperationWithCosts }>(
    CREATE_OPERATION, {
      refetchQueries: ['GetOperationsWithCosts'],
    }
  );

  const [newOperationName, setNewOperationName] = useState('');

  const handleAddRow = async () => {
    if (newOperationName.trim() === '') return;
    await createOperation({ variables: { name: newOperationName, plantId } });

    const operaton = createOperationData?.createOperation || {
      id: Math.random().toString(36),
      name: newOperationName,
      indirectCosts: [],
    };

    setPricingData([...pricingData, operaton]);
    setNewOperationName('');
  };

  return {
    handleAddRow,
    newOperationName,
    setNewOperationName,
  };
};

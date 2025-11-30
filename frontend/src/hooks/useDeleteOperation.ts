import { useMutation } from '@apollo/client/react';
import { DELETE_OPERATION } from '../graphql/queries';

export const useDeleteOperation = () => {
  const [deleteOperation, { loading, error }] = useMutation(DELETE_OPERATION);

  const handleDelete = async (operationId: string) => {
    try {
      await deleteOperation({
        variables: {
          deleteOperationId: operationId,
        },
      });
    } catch (err) {
      console.error('Error deleting operation:', err);
    }
  };

  return {
    handleDelete,
    loading,
    error,
  };
};

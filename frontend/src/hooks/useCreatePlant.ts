import { useMutation } from '@apollo/client/react';
import { CREATE_PLANT } from '../graphql/queries';

export const useCreatePlant = () => {
  const [createPlant, { data, loading, error }] = useMutation(CREATE_PLANT);

  return {
    createPlant,
    data,
    loading,
    error,
  };
};

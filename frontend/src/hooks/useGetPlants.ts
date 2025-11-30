import { useQuery } from '@apollo/client/react';
import type { Plant } from '../interfaces';
import { GET_PLANTS } from '../graphql/queries';

export const useGetPlants = () => {
  const { data, loading } = useQuery<{ getPlants: Plant[] }>(GET_PLANTS);
  return { plants: data?.getPlants || [], loading };
};

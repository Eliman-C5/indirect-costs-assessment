import { CostsResolvers } from './CostsResolvers';
import { plantsResolvers } from './PlantsResolvers';

export const resolvers = {
  Query: {
    ...CostsResolvers.Query,
    ...plantsResolvers.Query,
  },
  Mutation: {
    ...CostsResolvers.Mutation,
    ...plantsResolvers.Mutation,
  },
};

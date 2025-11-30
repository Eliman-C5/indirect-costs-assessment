import { GraphQLContext } from '../../server';

export const plantsResolvers = {
  Query: {
    getPlants: async (parent: any, args: any, context: GraphQLContext) => {
      return await context.prisma.plant.findMany({
        orderBy: { createdAt: 'asc' },
      });
    },
  },

  Mutation: {
    createPlant: async (parent: any, { name }: { name: string }, context: GraphQLContext) => {
      return await context.prisma.plant.create({
        data: { name },
      });
    },
  },
};

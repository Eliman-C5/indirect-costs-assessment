import { GraphQLContext } from "../../server";

export const CostsResolvers = {
    Query: {
        getRanges: async (parent: any, args: any, context: GraphQLContext) => {
            return await context.prisma.rangeVolume.findMany({
                orderBy: { order: 'asc' }
            });
        },

        getOperationsWithCosts: async (parent: any, { plantId }: { plantId: string }, context: GraphQLContext) => {
            return await context.prisma.operation.findMany({
                include: {
                    indirectCosts: {
                        where: { plantId },
                        include: { rangeVolume: true },
                        orderBy: { rangeVolume: { order: 'asc' } }
                    }
                },
                orderBy: { name: 'asc' }
            });
        },
    },
    Mutation: {
        saveCosts: async (parent: any, { plantId, operationName, costs }: {
            plantId: string;
            operationName: string;
            costs: Array<{ rangeVolumeId: string, cost: number }>;
        }, context: GraphQLContext) => {

        const operation = await context.prisma.operation.upsert({
            where: { name: operationName },
            update: { name: operationName },
            create: { name: operationName },
        });
        const operationId = operation.id;

        const upsertPromises = costs.map(costInput => {
            return context.prisma.indirectCost.upsert({
                where: {
                    plantId_operationId_rangeVolumeId: { 
                        plantId: plantId,
                        operationId: operationId,
                        rangeVolumeId: costInput.rangeVolumeId,
                    }
                },
                update: { cost: costInput.cost },
                create: {
                    plantId: plantId,
                    operationId: operationId,
                    rangeVolumeId: costInput.rangeVolumeId,
                    cost: costInput.cost,
                },
            });
        });
        
        await context.prisma.$transaction(upsertPromises);
        
        return context.prisma.operation.findUnique({ where: { id: operationId }, include: { indirectCosts: { include: { rangeVolume: true } } } });
        },
        createOperation: async (parent: any, { name, plantId }: { name: string, plantId: string }, context: GraphQLContext) => {
        const rangeVolumes = await context.prisma.rangeVolume.findMany();
    
        const operation = await context.prisma.operation.upsert({
            where: { name },
            update: { name },
            create: { name },
        });

        await context.prisma.$transaction(
            rangeVolumes.map(volume => 
                context.prisma.indirectCost.create({
                    data: {
                        plantId: plantId,
                        operationId: operation.id,
                        rangeVolumeId: volume.id,
                        cost: 0.00,
                    }
                })
            )
        );

        return context.prisma.operation.findUnique({
            where: { id: operation.id },
            include: { indirectCosts: { include: { rangeVolume: true } } },
        });
        },
        deleteOperation: async (parent: any, { id }: { id: string }, context: GraphQLContext) => {
            const operation = await context.prisma.operation.findUnique({
                where: { id }
            });

            if (!operation) {
                return false;
            }

            await context.prisma.indirectCost.deleteMany({
                where: { operationId: id }
            });

            await context.prisma.operation.delete({
                where: { id },
                include: { indirectCosts: { include: { rangeVolume: true } } }
            });

            return true;
        }   
    },
};
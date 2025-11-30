import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  await prisma.indirectCost.deleteMany()
  await prisma.operation.deleteMany()
  await prisma.plant.deleteMany()
  await prisma.rangeVolume.deleteMany()

  const rangosData = [
    { name: "300 kg", order: 1 },
    { name: "500 kg", order: 2 },
    { name: "1T", order: 3 },
    { name: "3T", order: 4 },
    { name: "5T", order: 5 },
    { name: "10T", order: 6 },
    { name: "20T", order: 7 },
    { name: "30T", order: 8 },
  ];
  
  const rangos = await Promise.all(
    rangosData.map(r =>
      prisma.rangeVolume.upsert({
        where: { name: r.name },
        update: { order: r.order },
        create: { name: r.name, order: r.order },
      })
    )
  );
  
  const plantPeru = await prisma.plant.upsert({
    where: { name: "Perú" },
    update: {},
    create: { name: "Perú" },
  })

  const printedOperation = await prisma.operation.upsert({
    where: { name: "Impresión" },
    update: {},
    create: { name: "Impresión" },
  })
  const laminatedOperation = await prisma.operation.upsert({
    where: { name: "Laminado" },
    update: {},
    create: { name: "Laminado" },
  })
  const baggedOperation = await prisma.operation.upsert({
    where: { name: "Embolsado" },
    update: {},
    create: { name: "Embolsado" },
  })

  const costosPorRango: Record<string, number> = {
    "300 kg": 0.015,
    "500 kg": 0.015,
    "1T": 15.0,
    "3T": 10.0,
    "5T": 8.0,
    "10T": 7.0,
    "20T": 5.0,
    "30T": 4.8,
  };

  const rangeIdPerName = (name: string) => {
    const r = rangos.find(r => r.name === name);
    if (!r) throw new Error(`No se encontró el rango con nombre: ${name}`);
    return r.id;
  };

  const operations = [printedOperation, laminatedOperation, baggedOperation];

  for (const op of operations) {
    for (const { name } of rangosData) {
      const cost = costosPorRango[name];
      if (cost === undefined) continue;
      await prisma.indirectCost.upsert({
        where: {
          plantId_operationId_rangeVolumeId: {
            plantId: plantPeru.id,
            operationId: op.id,
            rangeVolumeId: rangeIdPerName(name),
          },
        },
        update: { cost: cost },
        create: {
          cost: cost,
          plantId: plantPeru.id,
          operationId: op.id,
          rangeVolumeId: rangeIdPerName(name),
        },
      });
    }
  }

  console.log("🎉 Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import { seedPuzzles } from './seedData'

async function run() {
  await seedPuzzles()

  // eslint-disable-next-line no-console
  console.log('Seed complete')
  process.exit(0)
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})


interface SeedData {
    entries : SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};

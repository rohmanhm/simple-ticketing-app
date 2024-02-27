import { drop, factory, primaryKey } from '@mswjs/data';

import persist from './persist';

// UUID would be ideal, but for the sake of simplicity, we'll use a random string
const generateRandomId = () => Math.random().toString().split('.')[1] ?? '';

export const db = factory({
  ticket: {
    id: primaryKey(generateRandomId),
    title: String,
    description: String,
    status: String,
    created_at: () =>
      // The requirement says we need to store it as timestamp
      Date.now(),
  },
  user: {
    id: primaryKey(generateRandomId),
    email: String,
    password: String,
  },
});

persist(db);

export const dropDb = () => drop(db);

export const seedDb = () => {
  db.user.create({
    email: 'mhrohman@live.com',
    password: 'test123456',
  });

  db.user.create({
    email: 'test@email.com',
    password: 'test123456',
  });
};

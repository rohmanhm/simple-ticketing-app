import { HttpResponse, delay, http } from 'msw';

import { Ticket } from '@/features/ticket';

import { db } from './db';

const POSSIBLE_DELAYS = [500, 1000, 2000];
/**
 * Returns a random delay value from the POSSIBLE_DELAYS array.
 * @returns {number} The random delay value.
 */
const getRandomDelay = () => {
  return POSSIBLE_DELAYS[Math.floor(Math.random() * POSSIBLE_DELAYS.length)];
};

export const handlers = [
  http.post<never, { email: string; password: string }>(
    '/api/auth/login',
    async ({ request }) => {
      const { email, password } = await request.json();
      await delay(getRandomDelay());
      if (
        (email === 'test@vroom.com.au' && password === 'frontendtest2024') ||
        (email === 'mhrohman@live.com' && password === 'test123456')
      ) {
        return HttpResponse.json({ message: 'authenticated', data: { email } });
      }
      return HttpResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  ),
  http.post('/api/auth/logout', async () => {
    await delay(getRandomDelay());
  }),

  http.post<never, never>('/api/tickets', async ({ request }) => {
    const ticket = (await request.json()) as Ticket;
    await delay(getRandomDelay());

    const createdTicket = db.ticket.create(ticket);
    return HttpResponse.json({ data: createdTicket });
  }),

  http.put<never, never>('/api/tickets', async ({ request }) => {
    const ticket = (await request.json()) as Ticket;
    await delay(getRandomDelay());
    const updatedTicket = db.ticket.update({
      data: ticket,
      where: { id: { equals: ticket.id } },
    });
    return HttpResponse.json({ data: updatedTicket });
  }),

  http.get('/api/tickets', async ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');

    await delay(getRandomDelay());

    let filter = {};
    if (status) {
      filter = { where: { status: { equals: status } } };
    }

    const tickets = db.ticket.findMany({ skip: 0, take: 10, ...filter });
    return HttpResponse.json({ data: tickets });
  }),
];

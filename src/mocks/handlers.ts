import { HttpResponse, delay, http } from 'msw';

import { TicketType } from '@/features/ticket';

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

      try {
        const user = db.user.findFirst({
          where: { email: { equals: email }, password: { equals: password } },
        });

        if (user) {
          return HttpResponse.json({
            message: 'authenticated',
            data: { email },
          });
        }

        throw new Error('Invalid email or password');
      } catch (err) {
        return HttpResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }
    }
  ),
  http.post<never, { email: string; password: string }>(
    '/api/auth/register',
    async ({ request }) => {
      const { email, password } = await request.json();
      await delay(getRandomDelay());

      try {
        const user = db.user.create({
          email,
          password,
        });

        if (user) {
          return HttpResponse.json({
            message: 'authenticated',
            data: { email },
          });
        }

        throw new Error('Failed to create a new user.');
      } catch (err) {
        return HttpResponse.json(
          { error: 'Failed to create a new user.' },
          { status: 401 }
        );
      }
    }
  ),
  http.post('/api/auth/logout', async () => {
    await delay(getRandomDelay());
  }),

  http.post<never, never>('/api/tickets', async ({ request }) => {
    const ticket = (await request.json()) as TicketType;
    await delay(getRandomDelay());

    const createdTicket = db.ticket.create(ticket);
    return HttpResponse.json({ data: createdTicket });
  }),

  http.put<never, never>('/api/tickets', async ({ request }) => {
    const ticket = (await request.json()) as TicketType;
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

    const tickets = db.ticket.findMany({
      skip: 0,
      take: 10,
      ...filter,
      orderBy: { created_at: 'desc' },
    });
    return HttpResponse.json({ data: tickets });
  }),

  http.get<{ ticketId: string }>(
    '/api/ticket/:ticketId',
    async ({ params }) => {
      const { ticketId } = params;
      await delay(getRandomDelay());
      const ticket = db.ticket.findFirst({
        where: { id: { equals: ticketId } },
      });
      return HttpResponse.json({ data: ticket });
    }
  ),
];

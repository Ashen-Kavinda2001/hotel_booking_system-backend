import express from 'express';
import { getTickets, createTicket, updateTicketStatus, assignTicket, closeTicket } from '../controllers/TicketController.js';

const ticketRouter = express.Router();

ticketRouter.get('/', getTickets);
ticketRouter.post('/', createTicket);
ticketRouter.patch('/:id/status', updateTicketStatus);
ticketRouter.patch('/:id/assign', assignTicket);
ticketRouter.patch('/:id/close', closeTicket);

export default ticketRouter;

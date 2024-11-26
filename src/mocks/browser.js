import { setupWorker } from 'msw';
import { handlers } from './handlers/mainHandlers';

export const worker = setupWorker(...handlers);
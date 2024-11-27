import { mainHandlers } from './mainHandlers';
import { petHandlers } from './petHandlers';

export const handlers = [
  ...petHandlers,
  ...mainHandlers,
  //여기에 handlers 추가
];

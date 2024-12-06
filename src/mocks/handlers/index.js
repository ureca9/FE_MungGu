import { mainHandlers } from './mainHandlers';
import { petHandlers } from './petHandlers';
import { placeDetailHandler } from './placeDetailHandler';
import { pensionDetailHandler } from './pensionDetailHandler';

export const handlers = [
  ...petHandlers,
  ...mainHandlers,
  ...placeDetailHandler,
  ...pensionDetailHandler,
  //여기에 handlers 추가
];
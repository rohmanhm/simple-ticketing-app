import {
  TICKET_STATUS_CONFIG_MAPPING,
  TICKET_STATUS_VALUES,
} from './constants';
import { TicketType } from './types';

export const checkAllowedToMoveStatus = (
  fromStatus: string,
  toStatus: string
) => {
  // If we have configured the allowed options for the current
  // status, we want to use that. Otherwise, we want to allow to use all the options.
  const rule =
    TICKET_STATUS_CONFIG_MAPPING[fromStatus as TicketType['status']] ??
    TICKET_STATUS_VALUES;

  return rule?.includes(toStatus);
};

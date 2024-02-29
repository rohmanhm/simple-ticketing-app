export const TICKET_STATUS_OPTIONS = [
  {
    label: 'Open',
    value: 'open',
  },
  {
    label: 'In Progress',
    value: 'in-progress',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
];

export const TICKET_STATUS_VALUES = TICKET_STATUS_OPTIONS.map(
  (status) => status.value
);

// By default, we want to disable the current value.
// If we want to only enable certain values for a specific status, we can add
// a mapping here.
export const TICKET_STATUS_CONFIG_MAPPING = {
  completed: ['open'],
  // Put undefined to show all the options.
  // Keep remember the current value is always disabled by default.
  open: undefined,
  'in-progress': undefined,
};

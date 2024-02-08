import { TicketGroup } from './ticket-group';

export const TicketList = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md">
      <TicketGroup status="open" title="Open" />
      <TicketGroup status="in-progress" title="In Progress" />
      <TicketGroup status="completed" title="Completed" />
    </div>
  );
};

import { CreateTicketDialog, TicketList } from '@/features/ticket';

import { withNavbar } from '@/hocs/with-navbar';

export const MainPage = withNavbar(() => {
  return (
    <div className="w-4xl mt-5">
      <div className="mb-5 flex justify-end">
        <CreateTicketDialog />
      </div>
      <TicketList />
    </div>
  );
});

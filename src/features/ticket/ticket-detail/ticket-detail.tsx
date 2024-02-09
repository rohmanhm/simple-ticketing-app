import { useNavigate } from 'react-router-dom';

import { EditTicketForm, EditTicketFormProps } from '../manage-ticket';

interface TicketDetailProps
  extends Pick<EditTicketFormProps, 'defaultValues'> {}

export const TicketDetail = ({ defaultValues }: TicketDetailProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <EditTicketForm
        onUpdated={() => navigate('/')}
        defaultValues={defaultValues}
      />
    </div>
  );
};

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { WithDisclosureProps } from '@/hooks/use-disclosure';

import { EditTicketForm, EditTicketFormProps } from './edit-ticket-form';

interface EditTicketDialogProps
  extends WithDisclosureProps,
    Pick<EditTicketFormProps, 'defaultValues'> {}

export const EditTicketDialog = ({
  isOpen,
  onClose,
  defaultValues,
}: EditTicketDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update ticket</DialogTitle>
        </DialogHeader>
        <EditTicketForm onUpdated={onClose} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
};

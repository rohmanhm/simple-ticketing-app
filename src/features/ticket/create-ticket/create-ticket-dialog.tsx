import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDisclosure } from '@/hooks/use-disclosure';

import { CreateTicketForm } from './create-ticket-form';

export const CreateTicketDialog = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger onClick={onOpen} asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Create a new ticket</DialogTitle>
        </DialogHeader>
        <CreateTicketForm onCreated={onClose} />
      </DialogContent>
    </Dialog>
  );
};

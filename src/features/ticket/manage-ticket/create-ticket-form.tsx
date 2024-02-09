import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import { useCreateTicketMutation, useTicketsQuery } from '../services';
import {
  ManageTicketPrimitiveForm,
  ManageTicketPrimitiveFormSchema,
  ManageTicketPrimitiveFormSchemaType,
} from './manage-ticket-primitive-form';

interface CreateTicketFormProps {
  onCreated?: () => void;
}

export const CreateTicketForm = ({ onCreated }: CreateTicketFormProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<ManageTicketPrimitiveFormSchemaType>({
    resolver: zodResolver(ManageTicketPrimitiveFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'open',
    },
  });

  const mutation = useCreateTicketMutation({
    onSettled(response, error) {
      if (response?.error || error) {
        return toast({
          variant: 'destructive',
          description: response?.error ?? error?.message,
        });
      }

      queryClient.invalidateQueries({ queryKey: useTicketsQuery.getKey() });

      form.reset();

      onCreated?.();
    },
  });

  function onSubmit(values: ManageTicketPrimitiveFormSchemaType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <ManageTicketPrimitiveForm
        submitLabel="Create"
        onSubmit={onSubmit}
        isActionLoading={mutation.isPending}
      />
    </Form>
  );
};

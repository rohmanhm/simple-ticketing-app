import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import { useTicketsQuery, useUpdateTicketMutation } from '../services';

import {
  ManageTicketPrimitiveForm,
  ManageTicketPrimitiveFormSchema,
  ManageTicketPrimitiveFormSchemaType,
} from './manage-ticket-primitive-form';

export interface EditTicketFormProps {
  defaultValues: ManageTicketPrimitiveFormSchemaType;
  onUpdated?: () => void;
}

export const EditTicketForm = ({
  onUpdated,
  defaultValues,
}: EditTicketFormProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<ManageTicketPrimitiveFormSchemaType>({
    resolver: zodResolver(ManageTicketPrimitiveFormSchema),
    defaultValues,
  });

  const mutation = useUpdateTicketMutation({
    onSettled: async (response, error) => {
      if (response?.error || error) {
        return toast({
          variant: 'destructive',
          description: response?.error ?? error?.message,
        });
      }

      await queryClient.invalidateQueries({
        queryKey: useTicketsQuery.getKey(),
      });

      toast({
        variant: 'success',
        description: `Ticket "${response?.data.title}" is updated.`,
      });

      onUpdated?.();

      form.reset();
    },
  });

  function onSubmit(values: ManageTicketPrimitiveFormSchemaType) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <ManageTicketPrimitiveForm
        submitLabel="Update"
        onSubmit={onSubmit}
        isActionLoading={mutation.isPending}
      />
    </Form>
  );
};

import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const ManageTicketPrimitiveFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().max(100),
  description: z.string(),
  status: z.enum(['open', 'in-progress', 'completed']),
});

export type ManageTicketPrimitiveFormSchemaType = z.infer<
  typeof ManageTicketPrimitiveFormSchema
>;

interface ManageTicketPrimitiveFormProps {
  onSubmit: (data: ManageTicketPrimitiveFormSchemaType) => void;
  isActionLoading?: boolean;
  submitLabel?: string;
}

export const ManageTicketPrimitiveForm = ({
  onSubmit,
  isActionLoading = false,
  submitLabel = 'Submit',
}: ManageTicketPrimitiveFormProps) => {
  const form = useFormContext<ManageTicketPrimitiveFormSchemaType>();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Ticket title..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                rows={3}
                placeholder="Ticket description..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="py-2">
        <Button type="submit" isLoading={isActionLoading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

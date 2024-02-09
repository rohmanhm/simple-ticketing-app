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

const STATUS_OPTIONS = [
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
const STATUS_VALUES = STATUS_OPTIONS.map((status) => status.value);

// By default, we want to disable the current value.
// If we want to only enable certain values for a specific status, we can add
// a mapping here.
const STATUS_CONFIG_MAPPING = {
  completed: ['open'],
  // Put undefined to show all the options.
  // Keep remember the current value is always disabled by default.
  open: undefined,
  'in-progress': undefined,
};

interface ManageTicketPrimitiveFormProps {
  onSubmit: (data: ManageTicketPrimitiveFormSchemaType) => void;
  submitLabel?: string;
  isActionLoading?: boolean;
  /**
   * If this being enabled, we won't disable the options
   * with the disabled rules from the status config.
   */
  enableAllStatusOptions?: boolean;
}

export const ManageTicketPrimitiveForm = ({
  onSubmit,
  isActionLoading = false,
  submitLabel = 'Submit',
  enableAllStatusOptions = false,
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
                  {STATUS_OPTIONS.map((status) => {
                    // If we have configured the allowed options for the current
                    // status, we want to use that. Otherwise, we want to allow to use all the options.
                    const rule =
                      STATUS_CONFIG_MAPPING[field.value] ?? STATUS_VALUES;
                    const disabled = enableAllStatusOptions
                      ? false
                      : // By default we want to disable for the current value.
                        field.value === status.value ||
                        !rule?.includes(status.value);

                    return (
                      <SelectItem
                        key={status.value}
                        disabled={disabled}
                        value={status.value}
                      >
                        {status.label}
                      </SelectItem>
                    );
                  })}
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

      <div className="flex items-center justify-end py-2">
        <Button type="submit" isLoading={isActionLoading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

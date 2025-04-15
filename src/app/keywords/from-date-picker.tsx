'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DatePicker = ({ dateAsIsoString }: { dateAsIsoString: string }) => {
  const [date, setDate] = useOptimistic<Date | undefined>(
    dateAsIsoString ? new Date(dateAsIsoString) : undefined,
  );
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (date: Date | undefined) => {
    startTransition(() => {
      setDate(date);
      const newSearchParams = new URLSearchParams(searchParams);
      if (date) {
        newSearchParams.set('from', date.toISOString());
      } else {
        newSearchParams.delete('from');
      }
      router.replace(`/keywords?${newSearchParams.toString()}`);
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

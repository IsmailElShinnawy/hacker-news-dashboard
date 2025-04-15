'use client';

import { useOptimistic, useTransition } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';

type DatePickerProps = {
  value: string | undefined;
  onChange: (date: Date | undefined) => void;
};

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [date, setDate] = useOptimistic<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const [, startTransition] = useTransition();

  const handleChange = (date: Date | undefined) => {
    startTransition(() => {
      setDate(date);
      onChange(date);
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
        <Button variant="ghost" onClick={() => handleChange(undefined)}>
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

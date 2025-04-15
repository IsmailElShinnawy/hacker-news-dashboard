'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DatePicker from '@/components/date-picker';

const FromDatePicker = ({ dateAsIsoString }: { dateAsIsoString: string }) => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (date: Date | undefined) => {
    startTransition(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (date) {
        newSearchParams.set('from', date.toISOString());
      } else {
        newSearchParams.delete('from');
      }
      router.replace(`/stories?${newSearchParams.toString()}`);
    });
  };

  return <DatePicker value={dateAsIsoString} onChange={handleChange} />;
};

export default FromDatePicker;

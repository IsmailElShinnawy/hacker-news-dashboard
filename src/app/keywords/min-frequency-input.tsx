'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

const MinFrequencyInput = ({ value }: { value: number }) => {
  const [innerValue, setInnerValue] = useOptimistic(value);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const newValue = parseInt(e.target.value);
      setInnerValue(newValue);
      const newSearchParams = new URLSearchParams(searchParams);
      if (newValue > 0) {
        newSearchParams.set('min', newValue.toString());
      } else {
        newSearchParams.delete('min');
      }
      router.replace(`/keywords?${newSearchParams.toString()}`);
    });
  };

  return (
    <Input
      className="max-w-20"
      type="number"
      min={0}
      value={innerValue}
      onChange={handleChange}
    />
  );
};

export default MinFrequencyInput;

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import KeywordDropdown from '@/components/keyword-dropdown';

type KeywordFilterProps = {
  selectedKeywords: Array<string>;
};

const KeywordFilter = ({ selectedKeywords }: KeywordFilterProps) => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: Array<string>) => {
    startTransition(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (value.length > 0) {
        newSearchParams.set('keywords', value.join(','));
      } else {
        newSearchParams.delete('keywords');
      }
      router.replace(`/stories?${newSearchParams.toString()}`);
    });
  };

  return <KeywordDropdown value={selectedKeywords} onChange={handleChange} />;
};

export default KeywordFilter;

'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';
import { keywords } from '../constants';

const KeywordFilter = ({
  selectedKeywords = [],
}: {
  selectedKeywords: Array<string>;
}) => {
  const [innerSelectedKeywords, setInnerSelectedKeywords] =
    useOptimistic(selectedKeywords);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (keyword: string, checked: boolean) => {
    startTransition(() => {
      const newSelectedKeywords = checked
        ? [...innerSelectedKeywords, keyword]
        : innerSelectedKeywords.filter(k => k !== keyword);
      setInnerSelectedKeywords(newSelectedKeywords);
      const newSearchParams = new URLSearchParams(searchParams);
      if (newSelectedKeywords.length > 0) {
        newSearchParams.set('keywords', newSelectedKeywords.join(','));
      } else {
        newSearchParams.delete('keywords');
      }
      router.replace(`/keywords?${newSearchParams.toString()}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Keyword</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {keywords.map(keyword => (
          <DropdownMenuCheckboxItem
            key={keyword}
            checked={innerSelectedKeywords.includes(keyword)}
            onCheckedChange={checked => {
              handleChange(keyword, checked);
            }}
          >
            {keyword}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KeywordFilter;

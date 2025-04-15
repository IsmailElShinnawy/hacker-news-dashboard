'use client';

import { useOptimistic, useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { keywords } from '@/app/constants';

type KeywordDropdownProps = {
  value: Array<string>;
  onChange: (value: Array<string>) => void;
};

const KeywordDropdown = ({ value, onChange }: KeywordDropdownProps) => {
  const [innerValue, setInnerValue] = useOptimistic(value);
  const [, startTransition] = useTransition();

  const handleChange = (keyword: string, checked: boolean) => {
    startTransition(() => {
      const newSelectedKeywords = checked
        ? [...innerValue, keyword]
        : innerValue.filter(k => k !== keyword);
      setInnerValue(newSelectedKeywords);
      onChange(newSelectedKeywords);
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
            checked={innerValue.includes(keyword)}
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

export default KeywordDropdown;

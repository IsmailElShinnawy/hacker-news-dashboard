import { QueryClient } from '@tanstack/react-query';
import KeywordFilter from './keyword-filter';
import Link from 'next/link';
import FromDatePicker from './from-date-picker';
import getBaseUrl from '@/lib/get-base-url';
export default async function Stories({
  searchParams,
}: {
  searchParams: Promise<{ keywords: string; from: string }>;
}) {
  const queryClient = new QueryClient();
  const { keywords: keywordsString, from = '' } = await searchParams;
  const keywords = keywordsString ? keywordsString.split(',') : [];
  const response: {
    [keyword: string]: Array<{ id: string; title: string; url: string }>;
  } = await queryClient.fetchQuery({
    queryKey: ['stories', keywords],
    queryFn: async () => {
      const response = await fetch(
        `${getBaseUrl()}/api/stories?keywords=${keywords.join(',')}&fromDate=${from}`,
      );
      return response.json();
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="w-full flex space-x-6">
          <KeywordFilter selectedKeywords={keywords} />
          <FromDatePicker dateAsIsoString={from} />
        </div>
        <div className="w-full flex flex-col gap-4 max-h-3/4 overflow-y-auto">
          {Object.entries(response).map(([keyword, stories]) => {
            return (
              <div key={keyword} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">{keyword}</div>
                {stories.map(s => (
                  <Link
                    key={s.id}
                    href={s.url}
                    className="text-sm text-muted-foreground hover:text-primary"
                    target="_blank"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

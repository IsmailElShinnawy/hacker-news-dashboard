import { QueryClient } from '@tanstack/react-query';
import CustomBarChart from './custom-bar-chart';
import KeywordFilter from './keyword-filter';
import MinFrequencyInput from './min-frequency-input';
import FromDatePicker from './from-date-picker';
export default async function Keywords({
  searchParams,
}: {
  searchParams: Promise<{ keywords: string; min: string; from: string }>;
}) {
  const queryClient = new QueryClient();
  const {
    keywords: keywordsString,
    min: minString,
    from = '',
  } = await searchParams;
  const keywords = keywordsString ? keywordsString.split(',') : [];
  const min = minString ? parseInt(minString) : 0;
  const response = await queryClient.fetchQuery({
    queryKey: ['frequency', keywords, min, from],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/frequency?keywords=${keywords.join(',')}&minCount=${min}&fromDate=${from}`,
      );
      return response.json();
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="w-full flex space-x-6">
          <KeywordFilter selectedKeywords={keywords} />
          <MinFrequencyInput value={min} />
          <FromDatePicker dateAsIsoString={from} />
        </div>
        <CustomBarChart response={response} />
      </div>
    </div>
  );
}

import { Calendar } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  lastUpdated?: string;
  date?: string;
}

const PageHeader = ({
  title,
  description,
  subtitle,
  lastUpdated,
  date,
}: PageHeaderProps) => {
  const resolvedDescription = description ?? subtitle;
  const resolvedLastUpdated = lastUpdated ?? date;

  return (
    <div className="flex flex-col gap-1">
      <h1 className="m-0 text-2xl font-bold font-['Inter',sans-serif] text-gray-900">
        {title}
      </h1>
      {resolvedDescription && (
        <p className="m-0 text-lg font-normal font-['Inter',sans-serif] text-gray-500">
          {resolvedDescription}
        </p>
      )}
      {resolvedLastUpdated && (
        <div className="mt-1 flex items-center gap-1.5 text-lg font-['Inter',sans-serif] text-gray-500">
          <Calendar size={14} />
          {"\u00daltima actualizaci\u00f3n"}: {resolvedLastUpdated}
        </div>
      )}
    </div>
  );
};

export default PageHeader;

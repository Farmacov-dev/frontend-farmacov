import { MdCalendarToday } from 'react-icons/md';

  interface PageHeaderProps {
    title: string;
    description?: string;
    lastUpdated?: string;
  }

  const PageHeader = ({ title, description, lastUpdated }: PageHeaderProps) => (
    <div className="flex flex-col gap-1">
      <h1 className="m-0 text-2xl font-bold font-[Inter,sans-serif] text-gray-900">
        {title}
      </h1>
      {description && (
        <p className="m-0 text-sm font-normal font-[Inter,sans-serif] text-gray-500">
          {description}
        </p>
      )}
      {lastUpdated && (
        <div className="flex items-center gap-1.5 text-[13px] font-[Inter,sans-serif] text-gray-500 mt-1">
          <MdCalendarToday size={14} />
          Última actualización: {lastUpdated}
        </div>
      )}
    </div>
  );

  export default PageHeader;
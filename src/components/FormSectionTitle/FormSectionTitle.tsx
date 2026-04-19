interface FormSectionTitleProps {
  title: string;
  className?: string;
}

export default function FormSectionTitle({
  title,
  className = "",
}: FormSectionTitleProps) {
  return (
    <div className={`flex flex-col gap-2 my-2 ${className}`}>
      <h2 className="text-2xl font-semibold text-[#111827]">
        {title}
      </h2>
      <div className="h-px w-full bg-gray-200" />
    </div>
  );
}
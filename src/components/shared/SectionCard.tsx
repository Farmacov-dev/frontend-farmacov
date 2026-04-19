import React from "react";

type SectionCardProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const SectionCard = ({
  children,
  title,
  description,
  headerAction,
  className = "",
  contentClassName = "",
}: SectionCardProps) => {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      {(title || description || headerAction) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title && (
              <h3 className="text-base font-semibold text-slate-900">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>

          {headerAction && (
            <div className="shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className={contentClassName}>{children}</div>
    </section>
  );
};

export default SectionCard;
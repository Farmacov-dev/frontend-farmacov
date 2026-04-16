import React from "react";
import { MdClose, MdErrorOutline } from "react-icons/md";

type ErrorBannerType = "error" | "warning";

type ErrorBannerProps = {
  message: string;
  title?: string;
  type?: ErrorBannerType;
  onClose?: () => void;
  icon?: React.ReactNode;
};

const typeStyles = {
  error: {
    container: "bg-red-50 border-red-200",
    title: "text-red-800",
    message: "text-red-700",
    icon: "text-red-500",
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200",
    title: "text-yellow-800",
    message: "text-yellow-700",
    icon: "text-yellow-500",
  },
};

const ErrorBanner = ({
  message,
  title = "Ocurrió un problema",
  type = "error",
  onClose,
  icon,
}: ErrorBannerProps) => {
  const styles = typeStyles[type];

  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 ${styles.container}`}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 text-xl ${styles.icon}`}>
          {icon ? icon : <MdErrorOutline />}
        </span>

        <div>
          <p className={`text-sm font-semibold ${styles.title}`}>{title}</p>
          <p className={`mt-1 text-sm ${styles.message}`}>{message}</p>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 transition hover:text-slate-600"
        >
          <MdClose className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
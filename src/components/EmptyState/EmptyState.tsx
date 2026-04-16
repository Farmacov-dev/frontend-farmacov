// src/components/feedback/EmptyState/EmptyState.tsx

import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <p className={styles.title}>{title}</p>
    </div>
  );
}
// src/components/feedback/LoadingState/LoadingState.tsx

import styles from "./LoadingState.module.css";

interface LoadingStateProps {
  className?: string;
}

export default function LoadingState({
  className = "",
}: LoadingStateProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.spinner} aria-label="Cargando" role="status" />
    </div>
  );
}
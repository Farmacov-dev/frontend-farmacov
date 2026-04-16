// src/components/forms/FormSectionTitle/FormSectionTitle.tsx

import styles from "./FormSectionTitle.module.css";

interface FormSectionTitleProps {
  title: string;
  className?: string;
}

export default function FormSectionTitle({
  title,
  className = "",
}: FormSectionTitleProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider} />
    </div>
  );
}
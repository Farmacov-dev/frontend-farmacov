import styles from "./ComparisonRow.module.css";

export type ComparisonRowStatus = "better" | "worse" | "neutral";

interface ComparisonSide {
  value: string;
  status?: ComparisonRowStatus;
}

export interface ComparisonRowProps {
  index: number;
  label: string;
  left: ComparisonSide;
  right: ComparisonSide;
  showDivider?: boolean;
}

const getStatusClass = (status: ComparisonRowStatus = "neutral") => {
  switch (status) {
    case "better":
      return `${styles.comparisonRowValue} ${styles.comparisonRowValueBetter}`;
    case "worse":
      return `${styles.comparisonRowValue} ${styles.comparisonRowValueWorse}`;
    default:
      return `${styles.comparisonRowValue} ${styles.comparisonRowValueNeutral}`;
  }
};

const renderStatusIcon = (status: ComparisonRowStatus = "neutral") => {
  if (status === "better") {
    return <span className={styles.comparisonRowIcon}>◉</span>;
  }

  if (status === "worse") {
    return <span className={styles.comparisonRowIcon}>⊗</span>;
  }

  return null;
};

const ComparisonRow = ({
  index,
  label,
  left,
  right,
  showDivider = true,
}: ComparisonRowProps) => {
  return (
    <div
      className={`${styles.comparisonRow} ${
        showDivider ? styles.comparisonRowDivider : ""
      }`}
    >
      <div className={styles.comparisonRowLabelBlock}>
        <span className={styles.comparisonRowLabel}>
          {index}. {label}
        </span>
      </div>

      <div className={styles.comparisonRowContent}>
        <div className={`${styles.comparisonRowColumn} ${styles.comparisonRowColumnLeft}`}>
          <span className={getStatusClass(left.status)}>
            {renderStatusIcon(left.status)}
            {left.value}
          </span>
        </div>

        <div className={`${styles.comparisonRowColumn} ${styles.comparisonRowColumnRight}`}>
          <span className={getStatusClass(right.status)}>
            {renderStatusIcon(right.status)}
            {right.value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonRow;
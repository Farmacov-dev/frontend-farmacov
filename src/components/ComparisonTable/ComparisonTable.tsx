import ComparisonRow, { type ComparisonRowProps } from "../ComparisonRow/ComparisonRow";
import styles from "./ComparisonTable.module.css";

export interface ComparisonTableProps {
  rows: ComparisonRowProps[];
  className?: string;
}

const ComparisonTable = ({ rows, className = "" }: ComparisonTableProps) => {
  return (
    <section className={`${styles.comparisonTable} ${className}`.trim()}>
      <div className={styles.comparisonTableRows}>
        {rows.map((row, index) => (
          <ComparisonRow
            key={`${row.index}-${row.label}`}
            {...row}
            showDivider={index !== rows.length - 1}
          />
        ))}
      </div>

      <div className={styles.comparisonTableFooter}>
        <div className={styles.comparisonTableLegend}>
          <span
            className={`${styles.comparisonTableLegendItem} ${styles.comparisonTableLegendItemBetter}`}
          >
            <span className={styles.comparisonTableLegendIcon}>◉</span>
            Mejor opción
          </span>

          <span
            className={`${styles.comparisonTableLegendItem} ${styles.comparisonTableLegendItemWorse}`}
          >
            <span className={styles.comparisonTableLegendIcon}>⊗</span>
            Opción inferior
          </span>
        </div>

        <button type="button" className={styles.comparisonTableButton}>
          Volver
        </button>
      </div>
    </section>
  );
};

export default ComparisonTable;
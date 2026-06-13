import React from "react";
import EmptyState from "../EmptyState/EmptyState";

type ChartGroup = {
  label: string;
  firstValue: number;
  secondValue: number;
};

interface BarChartComparisonProps {
  data?: ChartGroup[];
  firstLabel?: string;
  secondLabel?: string;
  firstColor?: string;
  secondColor?: string;
  maxValue?: number;
}

const defaultTicks = [0, 1000, 5000, 10000, 15000];

const BarChartComparison = ({
  data = [],
  firstLabel = "Artralgias",
  secondLabel = "Mialgias",
  firstColor = "#29ABE2",
  secondColor = "#EB8F57",
  maxValue = 15000,
}: BarChartComparisonProps) => {
  const hasData =
    data.length > 0 &&
    data.some(
      (group) => group.firstValue > 0 || group.secondValue > 0
    );

  const getBarHeight = (value: number) => {
    // Las alturas se normalizan contra el máximo configurado para mantener la comparación.
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <section className="w-full rounded-lg border border-[#D9D9D9] bg-white p-6 shadow-sm">
      
      {/* Leyenda de las dos series mostradas en el gráfico. */}
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-5 w-5 rounded-[4px]"
            style={{ backgroundColor: firstColor }}
          />
          <span className="text-sm font-medium text-[#2F2F2F]">
            {firstLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="inline-block h-5 w-5 rounded-[4px]"
            style={{ backgroundColor: secondColor }}
          />
          <span className="text-sm font-medium text-[#2F2F2F]">
            {secondLabel}
          </span>
        </div>
      </div>

      {/* Evita renderizar un gráfico vacío cuando no hay datos útiles. */}
      {!hasData ? (
        <EmptyState title="No hay datos disponibles para mostrar" />
      ) : (
        <div className="flex gap-4">
          
          {/* Las etiquetas del eje Y van separadas de las barras para simplificar la alineación. */}
          <div className="relative flex h-[320px] w-[60px] flex-col justify-between pb-8 text-xs text-[#6B7280]">
            {defaultTicks
              .slice()
              .reverse()
              .map((tick) => (
                <span key={tick}>
                  {tick === 0 ? "0" : `${tick / 1000}k`}
                </span>
              ))}
          </div>

          {/* Área principal del gráfico con líneas guía y barras agrupadas. */}
          <div className="relative flex-1">
            
            {/* Las líneas guía ayudan a leer la altura relativa de cada barra. */}
            <div className="absolute inset-0 flex h-[320px] flex-col justify-between pb-8">
              {defaultTicks
                .slice()
                .reverse()
                .map((tick) => (
                  <div
                    key={tick}
                    className="w-full border-t border-[#D1D5DB]"
                  />
                ))}
            </div>

            {/* Cada categoría renderiza un par de barras: una por serie. */}
            <div className="relative flex h-[320px] items-end justify-around gap-8 pb-8">
              {data.map((group) => (
                <div
                  key={group.label}
                  className="flex w-full max-w-[220px] flex-col items-center"
                >
                  <div className="flex h-full w-full items-end justify-center gap-4">
                    <div
                      className="w-[86px] rounded-t-[2px]"
                      style={{
                        height: getBarHeight(group.firstValue),
                        backgroundColor: firstColor,
                      }}
                    />
                    <div
                      className="w-[86px] rounded-t-[2px]"
                      style={{
                        height: getBarHeight(group.secondValue),
                        backgroundColor: secondColor,
                      }}
                    />
                  </div>

                  <span className="mt-3 text-sm font-medium text-[#2F2F2F]">
                    {group.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BarChartComparison;

import React from "react";

type ChartItem = {
  label: string;
  value: number;
};

type ChartCardProps = {
  data?: ChartItem[];
};

const defaultData: ChartItem[] = [
  { label: "Dolor", value: 80 },
  { label: "Fiebre", value: 55 },
  { label: "Náusea", value: 40 },
  { label: "Fatiga", value: 65 },
  { label: "Mareo", value: 30 },
];

const ChartCard = ({ data }: ChartCardProps) => {
  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Frecuencia de síntomas
          </h3>
          <p className="text-sm text-slate-500">
            Distribución estimada por síntoma seleccionado
          </p>
        </div>

        <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
          Exportar
        </button>
      </div>

      <div className="rounded-xl bg-slate-50 p-5">
        <div className="mb-4 flex h-[320px] items-end gap-6">
          {chartData.map((item) => (
            <div
              key={item.label}
              className="flex flex-1 flex-col items-center justify-end"
            >
              <div
                className="mb-3 w-full max-w-[70px] rounded-t-xl bg-blue-500"
                style={{ height: `${item.value * 3}px` }}
              />
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChartCard;
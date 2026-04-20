import { FaShieldAlt, FaTimes } from "react-icons/fa";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import EmptyState from "../../EmptyState/EmptyState";

interface VaccineDetailModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  showEmptyState?: boolean;
  emptyMessage?: string;
}

const VaccineDetailModal = ({
  isOpen = true,
  onClose,
  showEmptyState = false,
  emptyMessage = "No hay información para mostrar sobre esta vacuna",
}: VaccineDetailModalProps) => {
  if (!isOpen) return null;

  const purchaseLocations = [
    {
      title: "Hospital",
      lines: ["Hospital", "Direccion"],
    },
    {
      title: "Bodega",
      lines: ["Bodega", "Direccion"],
    },
  ];

  const sideEffects = [
    { label: "Problemas Cardiacos", color: "text-[#FF1F1F]" },
    { label: "Disnea", color: "text-[#18B663]" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-3 sm:p-4 md:p-6">
      <div className="relative max-h-[95vh] w-full max-w-[1045px] overflow-y-auto rounded-[20px] bg-[#F3F3F3] px-5 py-6 shadow-xl sm:px-7 sm:py-8 lg:px-[42px] lg:py-[46px]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6B7280] transition hover:text-[#111827] sm:right-6 sm:top-6 lg:right-[38px] lg:top-[38px]"
          aria-label="Cerrar modal"
        >
          <FaTimes className="h-6 w-6 sm:h-7 sm:w-7 lg:h-[34px] lg:w-[34px]" />
        </button>

        {showEmptyState ? (
          <div className="flex min-h-[500px] items-center justify-center">
            <EmptyState title={emptyMessage} />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[1fr_432px] xl:gap-[28px]">
            <div className="flex flex-col">
              <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[10px] bg-[#4F7EF7] text-white sm:h-[76px] sm:w-[76px] lg:h-[90px] lg:w-[90px]">
                  <FaShieldAlt className="h-8 w-8 sm:h-10 sm:w-10 lg:h-[46px] lg:w-[46px]" />
                </div>

                <div className="pt-1">
                  <h1 className="text-[36px] font-normal leading-none text-black sm:text-[48px] lg:text-[64px]">
                    Comirnarty
                  </h1>
                  <p className="mt-3 text-[18px] font-normal leading-snug text-black sm:text-[20px] lg:mt-4 lg:text-[24px] lg:leading-none">
                    Disenada por: Pfizer-BioNTech
                  </p>
                </div>
              </div>

              <section className="mt-10 sm:mt-14 lg:mt-[148px]">
                <h2 className="text-[24px] font-bold leading-tight text-[#172033] sm:text-[30px] lg:text-[37px] lg:leading-none">
                  Descripcion general
                </h2>

                <p className="mt-6 max-w-[560px] text-[18px] font-normal leading-[1.6] text-[#617284] sm:mt-8 sm:text-[22px] lg:mt-[52px] lg:max-w-[500px] lg:text-[31px] lg:leading-[1.5]">
                  Vacuna basada en ARN mensajero.
                  <br />
                  Proporciona instrucciones a las
                  <br />
                  células para producir una proteína
                  <br />
                  inofensiva que genera una respuesta
                  <br />
                  inmunitaria
                </p>
              </section>

              <section className="mt-10 sm:mt-14 lg:mt-[165px]">
                <h2 className="text-[24px] font-bold leading-tight text-[#172033] sm:text-[30px] lg:text-[39px] lg:leading-none">
                  Especificaciones medicas
                </h2>

                <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8 lg:mt-[58px] lg:gap-[46px]">
                  <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 sm:grid-cols-[40px_1fr_auto] lg:grid-cols-[54px_1fr_auto]">
                    <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] sm:h-8 sm:w-8 lg:h-[40px] lg:w-[40px]" />
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:text-[32px]">
                      Tipo:
                    </span>
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:pr-[18px] lg:text-[32px]">
                      ARNm
                    </span>
                  </div>

                  <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 sm:grid-cols-[40px_1fr_auto] lg:grid-cols-[54px_1fr_auto]">
                    <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] sm:h-8 sm:w-8 lg:h-[40px] lg:w-[40px]" />
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:text-[32px]">
                      Dosis requerida:
                    </span>
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:pr-[18px] lg:text-[32px]">
                      2
                    </span>
                  </div>

                  <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 sm:grid-cols-[40px_1fr_auto] lg:grid-cols-[54px_1fr_auto]">
                    <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] sm:h-8 sm:w-8 lg:h-[40px] lg:w-[40px]" />
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:text-[32px]">
                      Temperatura:
                    </span>
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:pr-[18px] lg:text-[32px]">
                      -70°C
                    </span>
                  </div>

                  <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 sm:grid-cols-[40px_1fr_auto] lg:grid-cols-[54px_1fr_auto]">
                    <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] sm:h-8 sm:w-8 lg:h-[40px] lg:w-[40px]" />
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:text-[32px]">
                      Preservación:
                    </span>
                    <span className="text-[18px] font-normal leading-none text-black sm:text-[24px] lg:pr-[18px] lg:text-[32px]">
                      2 hrs (amb)
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col lg:items-end">
              <div className="mt-2 flex h-[52px] w-[150px] items-center justify-center rounded-full bg-[#DDEEE5] sm:h-[58px] sm:w-[170px] lg:mr-[116px] lg:mt-[28px] lg:h-[63px] lg:w-[182px]">
                <span className="text-[22px] font-medium text-[#0FA958] sm:text-[24px] lg:text-[27px]">
                  ● 95%
                </span>
              </div>

              <div className="mt-6 w-full rounded-[18px] bg-[#D3D3D3] px-5 py-5 sm:px-6 sm:py-6 lg:mt-[36px] lg:w-[432px] lg:px-[32px] lg:py-[28px]">
                <section>
                  <h2 className="text-center text-[26px] font-bold leading-tight text-[#172033] sm:text-[32px] lg:text-[40px] lg:leading-none">
                    Donde comprar:
                  </h2>

                  <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:gap-6 lg:mt-[40px] lg:gap-[32px]">
                    {purchaseLocations.length === 0 ? (
                      <div className="rounded-[20px] bg-[#F7F2F4] p-6">
                        <EmptyState title="No hay lugares disponibles" />
                      </div>
                    ) : (
                      purchaseLocations.map((location) => (
                        <div
                          key={location.title}
                          className="rounded-[20px] bg-[#F7F2F4] px-5 py-5 sm:px-6 lg:px-[30px] lg:py-[24px]"
                        >
                          <h3 className="text-[24px] font-normal leading-none text-black sm:text-[28px] lg:text-[31px]">
                            {location.title}
                          </h3>

                          <div className="mt-5 flex flex-col gap-5 sm:gap-6 lg:mt-[24px] lg:gap-[28px]">
                            {location.lines.map((line) => (
                              <div key={line} className="flex items-center gap-3">
                                <HiOutlineBars3BottomLeft className="h-5 w-5 text-[#172033] sm:h-6 sm:w-6 lg:h-[26px] lg:w-[26px]" />
                                <span className="text-[18px] font-normal leading-none text-black sm:text-[22px] lg:text-[24px]">
                                  {line}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                <section className="mt-8 sm:mt-10 lg:mt-[70px]">
                  <h2 className="text-[26px] font-bold leading-tight text-[#172033] sm:text-[32px] lg:text-[40px] lg:leading-none">
                    Efectos secundarios
                  </h2>

                  <div className="mt-5 rounded-[20px] bg-[#F7F2F4] px-5 py-5 sm:mt-6 sm:px-6 lg:mt-[38px] lg:px-[30px] lg:py-[28px]">
                    {sideEffects.length === 0 ? (
                      <EmptyState title="No hay efectos secundarios registrados" />
                    ) : (
                      <div className="flex flex-col gap-5 sm:gap-6 lg:gap-[34px]">
                        {sideEffects.map((effect) => (
                          <div key={effect.label} className="flex items-center gap-3">
                            <HiOutlineBars3BottomLeft
                              className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-[26px] lg:w-[26px] ${effect.color}`}
                            />
                            <span
                              className={`text-[18px] font-normal leading-none sm:text-[22px] lg:text-[24px] ${effect.color}`}
                            >
                              {effect.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccineDetailModal;
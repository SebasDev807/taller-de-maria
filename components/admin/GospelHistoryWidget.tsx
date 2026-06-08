import { getGospelHistory, republishGospel, deleteGospel } from "@/actions/gospel.actions";

export const GospelHistoryWidget = async () => {

  const result = await getGospelHistory();
  const gospels = result.success && result.data ? result.data : [];

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col border border-surface-container-high col-span-1 lg:col-span-3 mt-gutter">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            history
          </span>
          <h3 className="font-headline-md text-[20px] text-primary font-bold">Historial de Evangelios</h3>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {gospels.length === 0 ? (
          <p className="text-on-surface-variant text-body-md">No hay evangelios en el historial.</p>
        ) : (
          gospels.map((gospel) => (
            <div key={gospel.id} className="p-4 border border-outline-variant rounded-lg flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 w-full">
                <div className="flex justify-between items-start w-full">
                  <h4 className="font-headline-sm text-primary mb-1 uppercase pr-4">{gospel.title}</h4>
                  {gospel.reference && (
                    <span className="text-label-sm text-secondary italic text-right shrink-0">{gospel.reference}</span>
                  )}
                </div>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 max-w-xl">{gospel.text}</p>
                <span className="text-label-sm text-outline mt-2 block">
                  Publicado: {new Date(gospel.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <form action={async () => {
                  "use server";
                  await republishGospel(gospel.id);
                }}>
                  <button type="submit" className="text-secondary hover:text-secondary-fixed-dim text-label-md font-label-md px-3 py-2 rounded border border-secondary hover:bg-secondary/10 transition-colors">
                    Publicar
                  </button>
                </form>
                <form action={async () => {
                  "use server";
                  await deleteGospel(gospel.id);
                }}>
                  <button type="submit" className="text-error hover:text-error/80 text-label-md font-label-md px-3 py-2 rounded border border-error hover:bg-error/10 transition-colors flex items-center">
                    <span className="material-symbols-outlined text-sm mr-1">delete</span>
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

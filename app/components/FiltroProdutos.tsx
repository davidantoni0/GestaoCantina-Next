import { listarCategorias } from "../utils/produtos"

type FiltroProdutosProps = {
  busca: string;
  categoria: string;
  onBuscaChange: (valor: string) => void;
  onCategoriaChange: (categoria: string) => void;
};

const CATEGORIAS = listarCategorias();

export function FiltroProdutos({
  busca,
  categoria,
  onBuscaChange,
  onCategoriaChange,
}: FiltroProdutosProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-4">
      <input
        type="search"
        value={busca}
        onChange={(evento) => onBuscaChange(evento.target.value)}
        placeholder="Buscar produto..."
        aria-label="Buscar produto"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 sm:max-w-xs"
      />

      {/* No celular a fila de categorias rola de lado em vez de quebrar linha. */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
        {CATEGORIAS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategoriaChange(item)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition ${
              item === categoria
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

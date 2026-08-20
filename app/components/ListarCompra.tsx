import { CartItem } from "../types/Product"
import { montarLinhas, calcularTotal, formatarPreco } from "../utils/carrinho"

type ListarCompraProps = {
  items: CartItem[];
  onAumentar: (productId: number) => void;
  onDiminuir: (productId: number) => void;
  onRemover: (productId: number) => void;
  onFinalizar: () => void;
};

function IconeLixeira() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function ListarCompra({
  items,
  onAumentar,
  onDiminuir,
  onRemover,
  onFinalizar,
}: ListarCompraProps) {
  const linhas = montarLinhas(items);
  const total = calcularTotal(linhas);
  const quantidadeTotal = linhas.reduce((soma, linha) => soma + linha.quantity, 0);
  const vazio = linhas.length === 0;

  return (
    <aside className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm sm:p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Seu pedido
        </h2>

        {!vazio && (
          <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}
          </span>
        )}
      </div>

      {vazio ? (
        <p className="mt-4 text-sm text-gray-500">
          Nenhum produto adicionado ainda.
        </p>
      ) : (
        // No desktop a lista rola sozinha para o total nunca sair da tela.
        <ul className="mt-3 divide-y divide-gray-100 lg:max-h-[50vh] lg:overflow-y-auto">
          {linhas.map((linha) => (
            <li
              key={linha.product.id}
              className="flex items-start justify-between gap-3 py-3 first:pt-0"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {linha.product.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {formatarPreco(linha.product.price)} cada
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onDiminuir(linha.product.id)}
                    aria-label={`Diminuir quantidade de ${linha.product.name}`}
                    className="h-8 w-8 rounded-md border border-gray-300 text-base font-bold text-gray-700 transition hover:bg-gray-100 active:bg-gray-200"
                  >
                    -
                  </button>

                  <span className="w-6 text-center text-sm font-semibold text-gray-900">
                    {linha.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => onAumentar(linha.product.id)}
                    aria-label={`Aumentar quantidade de ${linha.product.name}`}
                    className="h-8 w-8 rounded-md border border-gray-300 text-base font-bold text-gray-700 transition hover:bg-gray-100 active:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {formatarPreco(linha.product.price * linha.quantity)}
                </span>

                <button
                  type="button"
                  onClick={() => onRemover(linha.product.id)}
                  title="Remover do pedido"
                  aria-label={`Remover ${linha.product.name} do pedido`}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-600 active:bg-red-100"
                >
                  <IconeLixeira />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-sm font-semibold text-gray-900">Total</span>
        <data value={total} className="text-xl font-bold text-gray-900">
          {formatarPreco(total)}
        </data>
      </div>

      <button
        type="button"
        onClick={onFinalizar}
        disabled={vazio}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Finalizar compra
      </button>
    </aside>
  );
}

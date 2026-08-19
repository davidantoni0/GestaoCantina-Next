import { CartItem } from "../types/Product"
import { montarLinhas, calcularTotal, formatarPreco } from "../utils/carrinho"

type ListarCompraProps = {
  items: CartItem[];
  onAumentar: (productId: number) => void;
  onDiminuir: (productId: number) => void;
  onFinalizar: () => void;
};

export function ListarCompra({
  items,
  onAumentar,
  onDiminuir,
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

              <span className="shrink-0 text-sm font-semibold text-gray-900">
                {formatarPreco(linha.product.price * linha.quantity)}
              </span>
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

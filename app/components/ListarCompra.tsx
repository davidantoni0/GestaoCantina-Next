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
  const vazio = linhas.length === 0;

  return (
    <aside className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left">
      <h2 className="text-xl font-semibold text-gray-900">Seu pedido</h2>

      {vazio ? (
        <p className="mt-4 text-sm text-gray-500">
          Nenhum produto adicionado ainda.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {linhas.map((linha) => (
            <li key={linha.product.id} className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-gray-900">
                {linha.product.name}
              </span>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onDiminuir(linha.product.id)}
                    aria-label={`Diminuir quantidade de ${linha.product.name}`}
                    className="h-7 w-7 rounded-md border border-gray-300 font-bold text-gray-700 transition hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="w-6 text-center font-medium text-gray-900">
                    {linha.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => onAumentar(linha.product.id)}
                    aria-label={`Aumentar quantidade de ${linha.product.name}`}
                    className="h-7 w-7 rounded-md border border-gray-300 font-bold text-gray-700 transition hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <span className="text-gray-600">
                  {formatarPreco(linha.product.price * linha.quantity)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold text-gray-900">Total</span>
        <data value={total} className="text-xl font-bold text-gray-900">
          {formatarPreco(total)}
        </data>
      </div>

      <button
        type="button"
        onClick={onFinalizar}
        disabled={vazio}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Finalizar compra
      </button>
    </aside>
  );
}

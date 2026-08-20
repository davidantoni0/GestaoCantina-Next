import { useState } from "react"
import { CartItem } from "../types/Product"
import { montarLinhas, calcularTotal, formatarPreco } from "../utils/carrinho"

type ConfirmarCompraProps = {
  items: CartItem[];
  onVoltar: () => void;
  onConfirmar: () => void;
};

export function ConfirmarCompra({
  items,
  onVoltar,
  onConfirmar,
}: ConfirmarCompraProps) {
  const linhas = montarLinhas(items);
  const total = calcularTotal(linhas);
  const [enviando, setEnviando] = useState(false);

  function handleConfirmar() {
    setEnviando(true);
    // Simula o tempo de processamento da venda antes de emitir o comprovante.
    setTimeout(() => onConfirmar(), 1200);
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-left">
      <h2 className="text-xl font-semibold text-gray-900">
        Confirmar pedido
      </h2>
      <p className="mt-1 text-sm font-normal text-gray-500">
        Confira os itens antes de finalizar.
      </p>

      <ul className="mt-5 flex flex-col gap-3">
        {linhas.map((linha) => (
          <li
            key={linha.product.id}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="font-medium text-gray-900">
              {linha.quantity}x {linha.product.name}
            </span>
            <span className="text-gray-600">
              {formatarPreco(linha.product.price * linha.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold text-gray-900">Total</span>
        <data value={total} className="text-xl font-bold text-gray-900">
          {formatarPreco(total)}
        </data>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onVoltar}
          disabled={enviando}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={handleConfirmar}
          disabled={enviando}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {enviando && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {enviando ? "Processando..." : "Confirmar"}
        </button>
      </div>
    </section>
  );
}

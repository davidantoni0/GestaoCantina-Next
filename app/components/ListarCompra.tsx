import products from "@/data/products.json"
import { CartItem } from "../types/Product"

type ListarCompraProps = {
  items: CartItem[];
};

function formatarPreco(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function ListarCompra({ items }: ListarCompraProps) {
  // Cada item guarda so o id e a quantidade, entao buscamos o produto aqui.
  const linhas = items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });

  const total = linhas.reduce(
    (soma, linha) => soma + linha.product.price * linha.quantity,
    0
  );

  return (
    <aside className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left">
      <h2 className="text-xl font-semibold text-gray-900">Seu pedido</h2>

      {linhas.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          Nenhum produto adicionado ainda.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
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
      )}

      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold text-gray-900">Total</span>
        <data value={total} className="text-xl font-bold text-gray-900">
          {formatarPreco(total)}
        </data>
      </div>
    </aside>
  );
}

import { Product } from "../types/Product";
import { formatarPreco } from "../utils/carrinho";

type CardProdutosProps = {
  product: Product;
  onAbrir: (product: Product) => void;
};

export function CardProdutos({ product, onAbrir, }: CardProdutosProps) {
  return (
    // O card inteiro e um botao: clicar abre o modal com a descricao.
    <button
      type="button"
      onClick={() => onAbrir(product)}
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <img
        src={product.image}
        alt={product.name}
        className="aspect-[4/3] w-full bg-gray-100 object-cover"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-base font-semibold leading-snug text-gray-900">
          {product.name}
        </span>

        {/* mt-auto empurra preco e link para a base, alinhando todos os cards */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <data value={product.price} className="text-lg font-bold text-gray-900">
            {formatarPreco(product.price)}
          </data>

          <span className="text-xs font-medium text-blue-600">
            Ver detalhes
          </span>
        </div>
      </div>
    </button>
  );
}

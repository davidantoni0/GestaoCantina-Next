import { Product } from "../types/Product";
import { formatarPreco } from "../utils/carrinho";

type CardProdutosProps = {
  product: Product;
  onAddToCart: (productId: number) => void;
};

export function CardProdutos({ product, onAddToCart, }: CardProdutosProps) {
  return (
    // h-full + flex: todos os cards da mesma linha ficam com a mesma altura.
    <article className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="h-36 w-full bg-gray-100 object-cover sm:h-40"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-base font-semibold leading-snug text-gray-900">
          {product.name}
        </h2>

        <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
          {product.description}
        </p>

        {/* mt-auto empurra preco e botao para a base, alinhando todos os cards */}
        <data
          value={product.price}
          className="mt-auto pt-1 text-lg font-bold text-gray-900"
        >
          {formatarPreco(product.price)}
        </data>

        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          className="w-full rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 active:bg-blue-800"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}

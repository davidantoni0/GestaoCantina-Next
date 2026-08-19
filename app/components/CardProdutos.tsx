import { Product } from "../types/Product";


type CardProdutosProps = {
  product: Product;
  onAddToCart: (productId: number) => void;
};

export function CardProdutos({ product, onAddToCart, }: CardProdutosProps) {
  return (
    <article className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="flex flex-col gap-3 p-5">
        <h2 className="text-xl font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="line-clamp-2 min-h-[40px] text-sm text-gray-500">
          {product.description}
        </p>

        <data
          value={product.price}
          className="text-2xl font-bold text-gray-900"
        >
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </data>

        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
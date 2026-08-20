import { useEffect } from "react"
import { Product } from "../types/Product"
import { formatarPreco } from "../utils/carrinho"

type ModalProdutoProps = {
  product: Product;
  onFechar: () => void;
  onAddToCart: (productId: number) => void;
};

function IconeFechar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ModalProduto({
  product,
  onFechar,
  onAddToCart,
}: ModalProdutoProps) {
  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") onFechar();
    }

    // Trava o scroll do fundo enquanto o modal esta aberto.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [onFechar]);

  function handleAdicionar() {
    onAddToCart(product.id);
    onFechar();
  }

  return (
    // Fundo escuro: clicar fora fecha o modal.
    <div
      onClick={onFechar}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-produto"
        // Impede que o clique dentro do modal chegue ao fundo e feche tudo.
        onClick={(evento) => evento.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white text-left shadow-xl sm:rounded-2xl"
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[4/3] w-full bg-gray-100 object-cover"
          />

          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition hover:bg-white"
          >
            <IconeFechar />
          </button>
        </div>

        <div className="flex flex-col gap-3 p-5">
          <span className="w-fit rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-800">
            {product.category}
          </span>

          <h2
            id="titulo-produto"
            className="text-xl font-semibold text-gray-900"
          >
            {product.name}
          </h2>

          <p className="text-sm leading-relaxed text-gray-600">
            {product.description}
          </p>

          <data
            value={product.price}
            className="text-2xl font-bold text-gray-900"
          >
            {formatarPreco(product.price)}
          </data>

          <button
            type="button"
            onClick={handleAdicionar}
            className="mt-1 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 active:bg-blue-800"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

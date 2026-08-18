export function CardProdutos() {
  return (
    <article className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <a href="/produto" className="block">
        <img
          src="produto.jpg"
          alt="Nome do produto"
          className="h-56 w-full object-cover"
        />
      </a>

      <div className="flex flex-col gap-3 p-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Nome do produto
        </h2>

        <p className="text-sm leading-relaxed text-gray-500">
          Descrição curta do produto.
        </p>

        <data
          value="199.90"
          className="text-2xl font-bold text-gray-900"
        >
          R$ 199,90
        </data>

        <button
          type="button"
          className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
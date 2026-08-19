import { CardProdutos } from "./CardProdutos"
import { filtrarProdutos } from "../utils/produtos"

type ListarProdutosProps = {
    busca: string;
    categoria: string;
    onAddToCart: (productId: number) => void;
};

export function ListarProdutos({ busca, categoria, onAddToCart }: ListarProdutosProps){
    const produtos = filtrarProdutos(busca, categoria);

    if (produtos.length === 0) {
        return (
            <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                Nenhum produto encontrado.
            </p>
        );
    }

    return(
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {produtos.map((product) => (
                <CardProdutos key={product.id} product={product} onAddToCart={onAddToCart}/>
            ))}
        </div>
    )
}

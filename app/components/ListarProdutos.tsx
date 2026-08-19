import products from "@/data/products.json"
import { CardProdutos } from "./CardProdutos"

type ListarProdutosProps = {
    onAddToCart: (productId: number) => void;
};

export function ListarProdutos({ onAddToCart }: ListarProdutosProps){
    return(
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <CardProdutos key={product.id} product={product} onAddToCart={onAddToCart}/>
            ))}
        </div>
    )
}

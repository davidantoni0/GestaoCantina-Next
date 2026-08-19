import products from "@/data/products.json"
import { CardProdutos } from "./CardProdutos"

export function ListarProdutos(){
    return(
        <div className="grid grid-cols-3">
            {products.map((product) => (
                <CardProdutos key={product.id} product={product} />
            ))}
        </div>
    )
}

import products from "@/data/products.json"
import { CardProdutos } from "./CardProdutos"

export function ListarProdutos(){
    return(
        <div>
            {products.map((product) => (
                <CardProdutos key={product.id} product={product} />
            ))}
        </div>
    )
}

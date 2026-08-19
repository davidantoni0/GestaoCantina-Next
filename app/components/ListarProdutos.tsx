'use client';
import products from "@/data/products.json"
import { CardProdutos } from "./CardProdutos"

export function ListarProdutos(){
    function handleAddToCart(productId: number) {
    console.log("Produto adicionado:", productId);
    }
    return(
        <div className="grid grid-cols-3">
            {products.map((product) => (
                <CardProdutos key={product.id} product={product} onAddToCart={handleAddToCart}/>
                
            ))}
        </div>
    )
}

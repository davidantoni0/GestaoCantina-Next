'use client';
import { useState } from "react"
import { ListarProdutos } from "../components/ListarProdutos"
import { ListarCompra } from "../components/ListarCompra"
import { CartItem } from "../types/Product"

export default function HomePage () {
    const [carrinho, setCarrinho] = useState<CartItem[]>([]);

    function handleAddToCart(productId: number) {
        setCarrinho((itensAtuais) => {
            const jaAdicionado = itensAtuais.some(
                (item) => item.productId === productId
            );

            // Ja esta no carrinho: soma 1 na quantidade em vez de repetir a linha.
            if (jaAdicionado) {
                return itensAtuais.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...itensAtuais, { productId, quantity: 1 }];
        });
    }

    return (
        <main className="bg-blue-800 text-center font-bold p-2 m-2 rounded-2xl"> 
            <h1> Cantina SENAI </h1>
                <div className="flex">
                    <section>
                        <ListarProdutos onAddToCart={handleAddToCart}/>
                    </section>

                    <section className="w-80 shrink-0 p-2">
                        <ListarCompra items={carrinho}/>
                    </section>
                </div>
                
        </main>
    );
}

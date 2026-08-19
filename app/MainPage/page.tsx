'use client';
import { useState } from "react"
import { ListarProdutos } from "../components/ListarProdutos"
import { ListarCompra } from "../components/ListarCompra"
import { ConfirmarCompra } from "../components/ConfirmarCompra"
import { CartItem } from "../types/Product"

export default function HomePage () {
    const [carrinho, setCarrinho] = useState<CartItem[]>([]);
    const [confirmando, setConfirmando] = useState(false);

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

    function handleAumentar(productId: number) {
        setCarrinho((itensAtuais) =>
            itensAtuais.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function handleDiminuir(productId: number) {
        setCarrinho((itensAtuais) =>
            itensAtuais
                .map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                // Chegou a zero: o item sai do carrinho.
                .filter((item) => item.quantity > 0)
        );
    }

    function handleConfirmar() {
        alert("Pedido confirmado! Retire no balcao da cantina.");
        setCarrinho([]);
        setConfirmando(false);
    }

    return (
        <main className="bg-blue-800 text-center font-bold p-2 m-2 rounded-2xl"> 
            <h1> Cantina SENAI </h1>

                {confirmando ? (
                    <div className="p-2">
                        <ConfirmarCompra
                            items={carrinho}
                            onVoltar={() => setConfirmando(false)}
                            onConfirmar={handleConfirmar}
                        />
                    </div>
                ) : (
                    <div className="flex">
                        <section>
                            <ListarProdutos onAddToCart={handleAddToCart}/>
                        </section>

                        <section className="w-80 shrink-0 p-2">
                            <ListarCompra
                                items={carrinho}
                                onAumentar={handleAumentar}
                                onDiminuir={handleDiminuir}
                                onFinalizar={() => setConfirmando(true)}
                            />
                        </section>
                    </div>
                )}
                
        </main>
    );
}

'use client';
import { useEffect, useState } from "react"
import { ListarProdutos } from "../components/ListarProdutos"
import { ListarCompra } from "../components/ListarCompra"
import { ConfirmarCompra } from "../components/ConfirmarCompra"
import { ReciboCompra, Pedido } from "../components/ReciboCompra"
import { CartItem } from "../types/Product"

export default function HomePage () {
    const [carrinho, setCarrinho] = useState<CartItem[]>([]);
    const [confirmando, setConfirmando] = useState(false);
    const [pedido, setPedido] = useState<Pedido | null>(null);

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
        // Guarda uma foto do pedido: numero, data e os itens daquele momento.
        setPedido({
            numero: Math.floor(1000 + Math.random() * 9000),
            data: new Date(),
            items: carrinho,
        });
    }

    // O recibo so existe na tela depois que o React renderiza o novo estado,
    // por isso a impressao acontece aqui, e nao dentro do handleConfirmar.
    useEffect(() => {
        if (!pedido) return;

        function limparPedido() {
            setCarrinho([]);
            setConfirmando(false);
            setPedido(null);
        }

        // "afterprint" dispara quando a janela de impressao e fechada,
        // tanto ao salvar o PDF quanto ao cancelar.
        window.addEventListener("afterprint", limparPedido);
        window.print();

        return () => window.removeEventListener("afterprint", limparPedido);
    }, [pedido]);

    return (
        <>
            <main className="bg-blue-800 text-center font-bold p-2 m-2 rounded-2xl print:hidden"> 
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

            {pedido && <ReciboCompra pedido={pedido}/>}
        </>
    );
}

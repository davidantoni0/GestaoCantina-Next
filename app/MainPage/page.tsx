'use client';
import { useEffect, useState } from "react"
import { ListarProdutos } from "../components/ListarProdutos"
import { ListarCompra } from "../components/ListarCompra"
import { ConfirmarCompra } from "../components/ConfirmarCompra"
import { ReciboCompra, Pedido } from "../components/ReciboCompra"
import { CartItem } from "../types/Product"
import { montarLinhas, calcularTotal, formatarPreco } from "../utils/carrinho"

export default function HomePage () {
    const [carrinho, setCarrinho] = useState<CartItem[]>([]);
    const [confirmando, setConfirmando] = useState(false);
    const [pedido, setPedido] = useState<Pedido | null>(null);

    const quantidadeTotal = carrinho.reduce((soma, item) => soma + item.quantity, 0);
    const total = calcularTotal(montarLinhas(carrinho));

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
            <div className="min-h-screen bg-zinc-100 print:hidden">
                <header className="sticky top-0 z-10 bg-blue-800 px-4 py-4 text-center shadow-md sm:px-6">
                    <h1 className="text-xl font-bold text-white sm:text-2xl">
                        Cantina SENAI
                    </h1>
                    <p className="mt-0.5 text-xs text-blue-200 sm:text-sm">
                        Monte seu pedido antes de chegar ao balcão
                    </p>
                </header>

                {confirmando ? (
                    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
                        <ConfirmarCompra
                            items={carrinho}
                            onVoltar={() => setConfirmando(false)}
                            onConfirmar={handleConfirmar}
                        />
                    </div>
                ) : (
                    // Uma coluna no celular; produtos + carrinho lado a lado a partir do lg.
                    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[1fr_20rem] lg:items-start lg:gap-6 xl:grid-cols-[1fr_22rem]">
                        <section>
                            <ListarProdutos onAddToCart={handleAddToCart}/>
                        </section>

                        {/* pb-24 no celular para a barra fixa nao cobrir o botao */}
                        <section
                            id="pedido"
                            className="mt-6 pb-24 lg:mt-0 lg:sticky lg:top-24 lg:pb-0"
                        >
                            <ListarCompra
                                items={carrinho}
                                onAumentar={handleAumentar}
                                onDiminuir={handleDiminuir}
                                onFinalizar={() => setConfirmando(true)}
                            />
                        </section>
                    </div>
                )}
            </div>

            {/* Atalho so no celular: leva direto ao carrinho la embaixo. */}
            {!confirmando && quantidadeTotal > 0 && (
                <a
                    href="#pedido"
                    className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 bg-blue-700 px-5 py-4 text-white shadow-lg lg:hidden print:hidden"
                >
                    <span className="text-sm font-medium">
                        Ver pedido · {quantidadeTotal}{" "}
                        {quantidadeTotal === 1 ? "item" : "itens"}
                    </span>
                    <span className="text-sm font-bold">{formatarPreco(total)}</span>
                </a>
            )}

            {pedido && <ReciboCompra pedido={pedido}/>}
        </>
    );
}

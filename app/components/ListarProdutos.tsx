import { useCallback, useEffect, useState } from "react"
import { CardProdutos } from "./CardProdutos"
import { ModalProduto } from "./ModalProduto"
import { Product } from "../types/Product"
import { filtrarProdutos } from "../utils/produtos"

type ListarProdutosProps = {
    busca: string;
    categoria: string;
    onAddToCart: (productId: number) => void;
};

export function ListarProdutos({ busca, categoria, onAddToCart }: ListarProdutosProps){
    // Um modal so para a lista inteira: guarda qual produto esta aberto.
    const [produtoAberto, setProdutoAberto] = useState<Product | null>(null);
    const [carregando, setCarregando] = useState(true);

    // Simula o tempo de resposta de um banco de dados.
    useEffect(() => {
        const tempo = setTimeout(() => setCarregando(false), 700);
        return () => clearTimeout(tempo);
    }, []);

    // useCallback para a funcao ser sempre a mesma e nao reiniciar
    // o efeito de teclado dentro do modal a cada renderizacao.
    const fecharModal = useCallback(() => setProdutoAberto(null), []);

    const produtos = filtrarProdutos(busca, categoria);

    if (carregando) {
        return (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-sm text-gray-500">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                Carregando produtos...
            </div>
        );
    }

    return(
        <>
            {produtos.length === 0 ? (
                <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {produtos.map((product) => (
                        <CardProdutos
                            key={product.id}
                            product={product}
                            onAbrir={(escolhido) => setProdutoAberto(escolhido)}
                        />
                    ))}
                </div>
            )}

            {produtoAberto && (
                <ModalProduto
                    product={produtoAberto}
                    onFechar={fecharModal}
                    onAddToCart={onAddToCart}
                />
            )}
        </>
    )
}

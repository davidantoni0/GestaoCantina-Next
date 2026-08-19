"use client";

import { useState } from "react";

type ItemCarrinho = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

const mockItens: ItemCarrinho[] = [
  { id: 1, nome: "Coxinha", preco: 6.5, quantidade: 2 },
  { id: 2, nome: "Suco de laranja", preco: 5.0, quantidade: 1 },
];

export default function CarrinhoPage() {
  const [itens, setItens] = useState<ItemCarrinho[]>(mockItens);

  function alterarQuantidade(id: number, delta: number) {
    setItens((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerItem(id: number) {
    setItens((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <main
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h2>🛒 Meu Carrinho</h2>

      {itens.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <div>
            <strong>{item.nome}</strong>
            <div>R$ {item.preco.toFixed(2)}</div>
          </div>

          <div>
            <button onClick={() => alterarQuantidade(item.id, -1)}>
              -
            </button>

            <span style={{ margin: "0 8px" }}>
              {item.quantidade}
            </span>

            <button onClick={() => alterarQuantidade(item.id, 1)}>
              +
            </button>

            <button
              onClick={() => removerItem(item.id)}
              style={{ marginLeft: "8px" }}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
import { useCallback, useSyncExternalStore } from "react";
import { CartItem } from "../types/Product";

const CHAVE = "cantina-senai:carrinho";

// Referencia fixa: usada no servidor e quando nao ha nada salvo.
const VAZIO: CartItem[] = [];

// Quem quiser ser avisado quando o carrinho mudar.
const ouvintes = new Set<() => void>();

// Guarda o ultimo texto lido e o resultado dele. Sem isso, cada leitura
// devolveria um array novo e o React ficaria renderizando em loop.
let ultimoTexto: string | null = null;
let ultimoValor: CartItem[] = VAZIO;

function interpretar(texto: string | null): CartItem[] {
  if (!texto) return VAZIO;

  try {
    const dados: unknown = JSON.parse(texto);
    if (!Array.isArray(dados)) return VAZIO;

    // So aceita itens no formato certo; o resto e descartado.
    return dados.filter(
      (item): item is CartItem =>
        typeof item?.productId === "number" &&
        typeof item?.quantity === "number" &&
        item.quantity > 0
    );
  } catch {
    return VAZIO;
  }
}

function lerCarrinho(): CartItem[] {
  const texto = window.localStorage.getItem(CHAVE);

  if (texto !== ultimoTexto) {
    ultimoTexto = texto;
    ultimoValor = interpretar(texto);
  }

  return ultimoValor;
}

// No servidor nao existe localStorage: o HTML e sempre gerado com o carrinho vazio.
function lerNoServidor(): CartItem[] {
  return VAZIO;
}

function assinar(avisar: () => void) {
  ouvintes.add(avisar);
  // "storage" dispara quando OUTRA aba mexe no mesmo localStorage.
  window.addEventListener("storage", avisar);

  return () => {
    ouvintes.delete(avisar);
    window.removeEventListener("storage", avisar);
  };
}

function gravar(itens: CartItem[]) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(itens));
  } catch {
    // Modo anonimo ou disco cheio: segue sem salvar em vez de quebrar a pagina.
  }

  ouvintes.forEach((avisar) => avisar());
}

type AcaoCarrinho = CartItem[] | ((atual: CartItem[]) => CartItem[]);

export function useCarrinhoSalvo() {
  // O carrinho "mora" no localStorage; o React apenas se inscreve nele.
  const carrinho = useSyncExternalStore(assinar, lerCarrinho, lerNoServidor);

  const setCarrinho = useCallback((acao: AcaoCarrinho) => {
    const atual = lerCarrinho();
    gravar(typeof acao === "function" ? acao(atual) : acao);
  }, []);

  return [carrinho, setCarrinho] as const;
}

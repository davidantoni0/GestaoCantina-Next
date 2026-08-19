import products from "@/data/products.json"
import { CartItem, Product } from "../types/Product"

export type LinhaCarrinho = {
  product: Product;
  quantity: number;
};

// O carrinho guarda so id + quantidade, entao aqui buscamos o produto completo.
export function montarLinhas(items: CartItem[]): LinhaCarrinho[] {
  return items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
}

export function calcularTotal(linhas: LinhaCarrinho[]) {
  return linhas.reduce(
    (soma, linha) => soma + linha.product.price * linha.quantity,
    0
  );
}

export function formatarPreco(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

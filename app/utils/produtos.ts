import products from "@/data/products.json"
import { Product } from "../types/Product"

export const CATEGORIA_TODAS = "todos";

// As categorias saem do proprio JSON, na ordem em que aparecem la.
export function listarCategorias() {
  return [CATEGORIA_TODAS, ...new Set(products.map((p) => p.category))];
}

// Tira acentos e maiusculas para "acai" tambem encontrar "Açaí".
function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filtrarProdutos(busca: string, categoria: string): Product[] {
  const termo = normalizar(busca);

  return products.filter((product) => {
    const daCategoria =
      categoria === CATEGORIA_TODAS || product.category === categoria;

    const bateBusca =
      termo === "" ||
      normalizar(product.name).includes(termo) ||
      normalizar(product.description).includes(termo);

    return daCategoria && bateBusca;
  });
}

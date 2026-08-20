import { CartItem } from "../types/Product"
import { montarLinhas, calcularTotal, formatarPreco } from "../utils/carrinho"

export type Cliente = {
  nome: string;
  cpf: string;
};

export type Pedido = {
  numero: number;
  data: Date;
  cliente: Cliente;
  items: CartItem[];
};

type ReciboCompraProps = {
  pedido: Pedido;
};

function formatarDataHora(data: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data);
}

function Separador() {
  return <div className="my-2 border-t border-dashed border-black" />;
}

export function ReciboCompra({ pedido }: ReciboCompraProps) {
  const linhas = montarLinhas(pedido.items);
  const total = calcularTotal(linhas);
  const quantidadeTotal = linhas.reduce((soma, linha) => soma + linha.quantity, 0);

  return (
    // Invisivel na tela; so aparece na hora de imprimir / salvar em PDF.
    <div className="mx-auto hidden w-[72mm] font-mono text-[11px] leading-tight text-black print:block">
      <header className="text-center">
        <h1 className="text-sm font-bold tracking-widest">CANTINA SENAI</h1>
        <p className="font-normal">Cardápio Digital</p>
      </header>

      <Separador />

      <div className="flex justify-between font-normal">
        <span>Pedido</span>
        <span className="font-bold">#{pedido.numero}</span>
      </div>
      <div className="flex justify-between font-normal">
        <span>Data</span>
        <span>{formatarDataHora(pedido.data)}</span>
      </div>
      <div className="flex justify-between gap-2 font-normal">
        <span>CPF</span>
        <span>{pedido.cliente.cpf}</span>
      </div>
      <div className="mt-1 break-words font-normal">
        Cliente: {pedido.cliente.nome}
      </div>

      <Separador />

      <ul className="font-normal">
        {linhas.map((linha) => (
          <li key={linha.product.id} className="mt-2 first:mt-0">
            <div className="font-bold">{linha.product.name}</div>
            <div className="flex justify-between">
              <span>
                {linha.quantity} x {formatarPreco(linha.product.price)}
              </span>
              <span>{formatarPreco(linha.product.price * linha.quantity)}</span>
            </div>
          </li>
        ))}
      </ul>

      <Separador />

      <div className="flex justify-between font-normal">
        <span>Itens</span>
        <span>{quantidadeTotal}</span>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <span>TOTAL</span>
        <span>{formatarPreco(total)}</span>
      </div>

      <Separador />

      <footer className="text-center font-normal">
        <p>Apresente este comprovante no balcão.</p>
        <p className="mt-2">Obrigado pela preferência!</p>
      </footer>
    </div>
  );
}

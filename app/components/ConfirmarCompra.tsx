import { SubmitEvent, useState } from "react"
import { CartItem } from "../types/Product"
import { Cliente } from "./ReciboCompra"
import { montarLinhas, calcularTotal, formatarPreco } from "../utils/carrinho"

type ConfirmarCompraProps = {
  items: CartItem[];
  onVoltar: () => void;
  onConfirmar: (cliente: Cliente) => void;
};

// Confere apenas o formato 000.000.000-00.
const CPF_VALIDO = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

// Vai colocando pontos e traco enquanto a pessoa digita.
function formatarCpf(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  return digitos
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

const ESTILO_CAMPO =
  "rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 disabled:bg-gray-100";

export function ConfirmarCompra({
  items,
  onVoltar,
  onConfirmar,
}: ConfirmarCompraProps) {
  const linhas = montarLinhas(items);
  const total = calcularTotal(linhas);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [enviando, setEnviando] = useState(false);

  const nomeValido = nome.trim().length >= 3;
  const cpfValido = CPF_VALIDO.test(cpf);
  const podeConfirmar = nomeValido && cpfValido && !enviando;

  function handleSubmit(evento: SubmitEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!podeConfirmar) return;

    setEnviando(true);
    // Simula o tempo de processamento da venda antes de emitir o comprovante.
    setTimeout(() => onConfirmar({ nome: nome.trim(), cpf }), 1200);
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-left">
      <h2 className="text-xl font-semibold text-gray-900">
        Confirmar pedido
      </h2>
      <p className="mt-1 text-sm font-normal text-gray-500">
        Confira os itens e informe seus dados.
      </p>

      <ul className="mt-5 flex flex-col gap-3">
        {linhas.map((linha) => (
          <li
            key={linha.product.id}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="font-medium text-gray-900">
              {linha.quantity}x {linha.product.name}
            </span>
            <span className="text-gray-600">
              {formatarPreco(linha.product.price * linha.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold text-gray-900">Total</span>
        <data value={total} className="text-xl font-bold text-gray-900">
          {formatarPreco(total)}
        </data>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            disabled={enviando}
            placeholder="Seu nome completo"
            autoComplete="name"
            className={ESTILO_CAMPO}
          />
          {nome.length > 0 && !nomeValido && (
            <p className="text-xs text-red-600">
              Digite pelo menos 3 caracteres.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
            CPF
          </label>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(evento) => setCpf(formatarCpf(evento.target.value))}
            disabled={enviando}
            placeholder="000.000.000-00"
            inputMode="numeric"
            className={ESTILO_CAMPO}
          />
          {cpf.length > 0 && !cpfValido && (
            <p className="text-xs text-red-600">
              CPF incompleto. Use o formato 000.000.000-00.
            </p>
          )}
        </div>

        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={onVoltar}
            disabled={enviando}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Voltar
          </button>

          <button
            type="submit"
            disabled={!podeConfirmar}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {enviando && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {enviando ? "Processando..." : "Confirmar"}
          </button>
        </div>
      </form>
    </section>
  );
}

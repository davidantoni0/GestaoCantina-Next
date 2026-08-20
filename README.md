# 🍔 Cardápio da Cantina

Sistema de **Cardápio Digital** desenvolvido para facilitar e agilizar os pedidos dos alunos durante o intervalo escolar.

## 🎯 Objetivo

Permitir que o aluno **monte seu pedido pelo celular antes de chegar ao balcão**, podendo consultar os produtos, escolher as quantidades e conferir o valor total. Assim, o atendimento se torna mais rápido e as filas podem ser reduzidas.

## ✨ Funcionalidades

* 🔎 **Filtro por categoria:** visualizar apenas os produtos desejados, como bebidas, lanches e salgados;
* 🛒 **Carrinho de pedidos:** adicionar ou remover produtos do pedido;
* ➕ **Controle de quantidade:** aumentar ou diminuir a quantidade de cada item;
* 💰 **Cálculo do total:** visualizar o valor total do pedido antes de finalizar;
* 💾 **Persistência:** manter o pedido salvo mesmo após fechar ou atualizar o navegador;
* 🎟️ **Número do pedido:** gerar uma identificação para facilitar a organização e retirada do pedido.

## 📋 Requisitos

### Catálogo
* Produtos exibidos em **cards**, organizados por **abas de categoria** (salgados · bebidas · doces · combos), com campo de **busca**;
* **Modal de detalhe:** ao clicar em um produto, abre a descrição, o preço e o botão **adicionar**.

### Carrinho
* Permitir **adicionar, remover e alterar a quantidade** de cada item;
* Exibir o **subtotal por item** e o **total geral** calculado automaticamente;
* **Contador de itens** sempre visível no ícone do carrinho.

### Checkout
* Validar **nome, turma e forma de pagamento** antes de finalizar o pedido;
* Ao confirmar, gerar o **número do pedido**;
* Tentar fechar o pedido com o **carrinho vazio** deve exibir um **erro na tela**.

### Dados
* Base de dados com as entidades **produtos** e **pedidos**;
* O **carrinho** deve **sobreviver ao F5** (persistido no `localStorage`);
* **Seed inicial:** 24 produtos distribuídos nas 4 categorias, com preços reais.

## 🛠️ Tecnologias

* **React**
* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **localStorage**

## 🚀 Getting Started

Instale as dependências e rode o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000/MainPage](http://localhost:3000/MainPage) no navegador para ver o cardápio digital em funcionamento.

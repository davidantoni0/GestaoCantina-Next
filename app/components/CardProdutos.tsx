export function CardProdutos(){
    return (
        <article className="product-card">
            <a href="/produto">
                <img src="produto.jpg" alt="Nome do produto"/>
            </a>

            <div className="product-card__content">
            <h2>Nome do produto</h2>

            <p>Descrição curta do produto.</p>

            <data value="199.90">R$ 199,90</data>

            <button type="button">Adicionar ao carrinho</button>
            </div>
        </article>
    );
}
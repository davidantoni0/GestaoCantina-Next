import { ListarProdutos } from "../components/ListarProdutos"

export default function HomePage () {
    return (
        <main className="bg-blue-800 text-center font-bold p-2 m-2 rounded-2xl"> 
            <h1> Cantina SENAI </h1>
                <div className="flex">
                    <section>
                        <ListarProdutos/>
                    </section>

                    <section>
                        <div>
                            <h1> TESTE DE LAYOUT </h1>
                        </div>
                    </section>
                </div>
                
        </main>
    );
}
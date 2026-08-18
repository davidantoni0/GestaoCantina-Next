import { ListarProdutos } from "../components/ListarProdutos"

export default function HomePage () {
    return (
        <main className="bg-gray-600"> 
            <h1> Cantina SENAI </h1>
            <ListarProdutos/>
        </main>
    )
}
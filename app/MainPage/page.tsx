import { CardProdutos } from "../components/CardProdutos" 

export default function HomePage () {
    return (
        <main className="bg-blue-800 text-center font-bold p-2 m-2 w-fit rounded-2xl"> 
            <h1> Cantina SENAI </h1>
            <CardProdutos/>
        </main>

    )
}
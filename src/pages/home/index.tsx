import { Container } from "../../components/container";

export function Home() {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input type="text" placeholder="Digite o nome do carro" className="w-full border-2 rounded-md h-9 px-3 outline-none" />
        <button className="bg-red-500 h-9 px-8 rounded-md text-white font-medium">Buscar</button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">Carros novos e usados em todo o Brasil!</h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white text-black rounded-md hover:scale-105 transition-allshadow-2xl">
          <img className="w-full mb-3 max-h-72 rounded-t-md" src="https://image.webmotors.com.br/_fotos/AnuncioNovos/gigante/2023/202312/20231206/NISSAN-KICKS-1.6-16V-FLEXSTART-ACTIVE-XTRONIC-wmimagem12084063613.jpg?s=fill&w=249&h=186&q=70" alt="" />
          <div className="px-2">
            <p className="font-bold">BMW 320I</p>
            <div className="flex flex-col">
              <span className="text-zinc-700 mb-6">ano 2020/2020 | 23.000 KM</span>
              <strong className="text-black font-medium text-xl">R$ 150.000</strong>
            </div>
            <div className="border-t-2 border-b-gray-700 my-2 pb-2">
              <p className="text-black mt-2">São Paulo - SP</p>
            </div>
          </div>
        </section>
      </main>
    </Container>
  )
}
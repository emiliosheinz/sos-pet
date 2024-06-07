export default function NotFound() {
  return (
    <main className="container mb-8 max-w-5xl pt-16">
      <div className="flex h-[300px] flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold">Página não encontrada</h1>
        <div>
          <p>
            Ops! Algo saiu errado, a página que você procura possivelmente não
            existe ou não foi encontrada.
          </p>
        </div>
      </div>
    </main>
  );
}

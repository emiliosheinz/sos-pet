import Image from "next/image";

export default function About() {
  return (
    <main className="mb-8 bg-white">
      <div className="relative mb-8 h-72 w-full">
        <Image
          className="object-cover"
          src="/about-background.jpg"
          alt="Ícone de um cachorro"
          fill
        />
      </div>

      <div className="container max-w-5xl">
        <h1 className="mb-10 text-3xl font-bold">Sobre nós</h1>
        <div className="space-y-3 text-base font-light leading-7">
          <p>
            O SOS Pet é um sistema dedicado a conectar animais resgatados de
            enchentes com abrigos temporários disponíveis. Acreditamos que, em
            momentos de crise, cada vida é importante, e é nossa missão ajudar a
            garantir que animais em situação de risco encontrem um local seguro
            e acolhedor enquanto aguardam seu retorno ao lar ou um novo começo.
          </p>

          <p>
            Nosso sistema foi criado com um único propósito: facilitar o
            processo de resgate e abrigo de animais em situações de emergência,
            especialmente durante enchentes e desastres naturais. Entendemos que
            esses eventos podem ser devastadores para pessoas e animais, e
            queremos ser parte da solução, proporcionando uma ferramenta que
            simplifique a busca por abrigos temporários.
          </p>
          <p>
            Com o SOS Pet, as pessoas que resgatam animais de enchentes podem
            rapidamente encontrar abrigos próximos com vagas disponíveis,
            obtendo informações cruciais, como capacidade, contato e
            localização. Nosso sistema permite que abrigos se cadastrem e
            atualizem suas informações, proporcionando uma base de dados
            confiável para os resgatadores.
          </p>
          <p>
            O que nos diferencia é o compromisso com a segurança e o bem-estar
            dos animais. Para garantir a qualidade dos abrigos cadastrados, cada
            registro passa por uma avaliação cuidadosa por nossa equipe, que
            verifica se o local atende aos padrões de segurança e adequação para
            os animais.
          </p>
          <p>
            Além de conectar animais resgatados com abrigos, também trabalhamos
            para conscientizar a comunidade sobre a importância de se preparar
            para desastres naturais e cuidar dos animais durante essas situações
            críticas. Acreditamos que, ao fornecer suporte e orientação, podemos
            ajudar a salvar vidas e criar uma rede de proteção eficaz para
            animais vulneráveis.
          </p>
          <p>
            Seja você um resgatador, um abrigo, ou alguém que simplesmente
            deseja fazer a diferença, o SOS Pet está aqui para unir forças e
            criar um impacto positivo. Junte-se a nós nesta jornada e ajude a
            transformar um momento de crise em uma oportunidade para fazer a
            diferença na vida de um animal. Juntos, podemos salvar vidas e
            construir um futuro mais seguro para nossos amigos de quatro patas.
          </p>
        </div>
      </div>
    </main>
  );
}

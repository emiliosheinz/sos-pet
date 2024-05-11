"use client";

import Link from "next/link";

export default function TermsOfUse() {
  return (
    <main className="container mb-8 pt-16">
      <h1 className="mb-4 text-2xl font-bold">Termos de uso</h1>

      <span className="mb-6 block font-light text-zinc-700">
        Data de Atualização: 11 de maio de 2024
      </span>

      <div className="space-y-4">
        <p>
          Bem-vindo ao SOS Pet. Estes Termos de Uso descrevem as regras e
          diretrizes para a utilização do nosso sistema. Ao acessar ou usar
          nosso sistema, você concorda em seguir estes termos.
        </p>
        <p className="font-bold">1. Cadastro de Usuário</p>
        <p>
          1.1. Para utilizar as funcionalidades do sistema, é necessário criar
          uma conta de usuário. Você concorda em fornecer informações precisas e
          completas ao se cadastrar e em manter essas informações atualizadas.
        </p>
        <p>
          1.2. É de sua responsabilidade manter a segurança de sua conta,
          incluindo seu nome de usuário e senha. Se você suspeitar de qualquer
          atividade não autorizada em sua conta, deve nos informar
          imediatamente.
        </p>
        <p className="font-bold">2. Uso do Sistema</p>
        <p>
          2.1. O sistema é destinado ao cadastro de abrigos temporários para
          animais resgatados de enchentes. Você concorda em usar o sistema
          apenas para fins lícitos e de acordo com todas as leis aplicáveis.
        </p>
        <p>
          2.2. Você não pode utilizar o sistema para fins comerciais ou
          lucrativos, nem para promover qualquer tipo de atividade ilegal ou
          prejudicial.
        </p>
        <p className="font-bold">3. Cadastro de Abrigos</p>
        <p>
          3.1. Se você cadastrar um abrigo no sistema, é de sua responsabilidade
          fornecer informações precisas, incluindo número de vagas disponíveis,
          telefones para contato e outras informações necessárias.
        </p>
        <p>
          3.2. Todos os cadastros de abrigos estão sujeitos à aprovação da nossa
          equipe. Ao cadastrar um abrigo, você concorda que o mesmo passará por
          uma avaliação antes de ser aceito no sistema. Nossa equipe revisará as
          informações fornecidas para garantir que o abrigo atende nossos
          padrões de segurança e qualidade.
        </p>
        <p>
          3.3. Ao cadastrar um abrigo, você declara que tem autoridade para
          fazê-lo e que o abrigo é seguro para animais.
        </p>
        <p>
          3.4. Você concorda em manter atualizadas as informações do seu abrigo
          e em notificar o sistema caso as condições do abrigo mudem.
        </p>
        <p className="font-bold">4. Privacidade</p>
        <p>
          4.1. A coleta e uso de informações pessoais são regidos por nossa
          Política de Privacidade, que você pode encontrar{" "}
          <Link href="/privacy-policy">aqui</Link>.
        </p>
        <p>
          4.2. Você concorda em não compartilhar informações pessoais de outros
          usuários sem o consentimento deles.
        </p>
        <p className="font-bold">5. Responsabilidade e Isenção de Garantias</p>
        <p>
          5.1. O sistema é fornecido a partir de uma versão base e não
          garantimos que estará livre de erros. Novas atualizações podem ser
          feitas sem aviso prévio para corrigir erros ou possibilitar novas
          funcionalidades.
        </p>
        <p>
          5.2. Não somos responsáveis por quaisquer danos decorrentes do uso do
          sistema, incluindo, mas não se limitando a interrupção de serviço,
          perda de dados ou compartilhamento de informações cadastradas
          incorretamente.
        </p>
        <p className="font-bold">6. Modificações nos Termos de Uso</p>
        <p>
          6.1. Reservamo-nos o direito de modificar estes Termos de Uso a
          qualquer momento. Notificaremos os usuários sobre alterações
          significativas, e o uso contínuo do sistema após a notificação
          constituirá aceitação dos novos termos.
        </p>
        <p className="font-bold">7. Rescisão</p>
        <p>
          7.1. Podemos encerrar sua conta ou acesso ao sistema a nosso critério,
          a qualquer momento, sem aviso prévio, se acreditarmos que você violou
          estes Termos de Uso.
        </p>
        <p className="font-bold">8. Contato</p>
        <p>
          8.1. Se você tiver dúvidas ou preocupações sobre estes Termos de Uso,
          entre em contato conosco pelo e-mail:{" "}
          <a href="mailto:sospet.suporte@gmail.com" className="underline">
            sospet.suporte@gmail.com
          </a>{" "}
          ou pelo telefone (51) 99732-6430.
        </p>
        <p className="font-bold">9. Jurisdição</p>
        <p>
          9.1. Estes Termos de Uso são regidos pelas leis do Brasil, sem
          considerar seus conflitos de princípios legais. Qualquer disputa
          decorrente destes Termos será resolvida em Novo Hamburgo/RS.
        </p>
        <p>
          Obrigado por usar nosso sistema para ajudar animais em necessidade.
          Juntos, podemos fazer a diferença.
        </p>
      </div>
    </main>
  );
}

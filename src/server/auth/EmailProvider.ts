import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { env } from "~/env";

export function CustomEmailProvider() {
  return EmailProvider({
    server: {
      host: env.EMAIL_HOST,
      port: Number(env.EMAIL_PORT),
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
      secure: true,
    },
    from: env.EMAIL_FROM,
    /**
     * Sends an email with a link to the user to verify their email address.
     * @see https://next-auth.js.org/providers/email#customizing-emails
     * */
    async sendVerificationRequest(params) {
      const { identifier, url, provider } = params;
      const transport = createTransport(provider.server);
      const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: "Acesse sua conta SOS Pet",
        text: `Acesse agora a sua conta SOS Pet e comece a ajudar animais resgatados.\n\n`,
        html: html({ url }),
      });
      const failed = result.rejected.concat(result.pending).filter(Boolean);
      if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
      }
    },
  });
}

function html({ url }: { url: string }) {
  const brandColor = "#333333";
  const color = {
    background: "#FFFFFF",
    text: "#333333",
    mainBackground: "#FFFFFF",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#FFFFFF",
  };

  return `
  <body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="left"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Acesse sua conta <strong>SOS Pet</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="left"
              style="font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
              Olá!
              <br><br>
              Estamos felizes por você se juntar a nós no SOS Pet, uma comunidade dedicada a conectar animais resgatados de enchentes com abrigos disponíveis. Sua participação é essencial para garantir que esses animais encontrem um lugar seguro e acolhedor.
              <br><br>
              Para acessar sua conta no SOS Pet, clique no botão abaixo:
              <br><br>
            </td>
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Acessar conta</a></td>
          </tr>
          <tr>
            <td align="left"
              style="padding: 20px 0px 0px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
              Caso o botão acima não funcione, você também pode copiar e colar o link abaixo em seu navegador:
              <br><br>
              ${url}
            </td> 
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="left"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Se você não solicitou este e-mail, você pode ignorá-lo com segurança.
      </td>
    </tr>
  </table>
</body>
`;
}

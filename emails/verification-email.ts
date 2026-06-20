/**
 * Genera el HTML del email de verificación de cuenta.
 * Usa HTML/CSS inline para máxima compatibilidad con clientes de correo.
 */
export function buildVerificationEmail({
  name,
  verificationUrl,
}: {
  name: string;
  verificationUrl: string;
}): string {
  const firstName = name.split(" ")[0];

  return /* html */ `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirma tu cuenta — Taller de María</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF6F0;font-family:'Georgia',serif;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#FAF6F0;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="100%" style="max-width:560px;background-color:#FFFFFF;
          border-radius:16px;overflow:hidden;
          box-shadow:0 4px 24px rgba(120,80,20,0.10);">

          <!-- Header con gradiente -->
          <tr>
            <td style="background:linear-gradient(135deg,#7E5700 0%,#B07D00 100%);
              padding:36px 40px 28px;text-align:center;">
              <p style="margin:0 0 8px;font-size:30px;">⛪</p>
              <h1 style="margin:0;color:#FFFFFF;font-size:22px;font-weight:700;
                letter-spacing:0.5px;font-family:'Georgia',serif;">
                Taller de María
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.80);font-size:13px;
                font-family:Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;">
                Confirma tu cuenta
              </p>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <p style="margin:0 0 16px;color:#3D2800;font-size:18px;font-weight:600;
                font-family:'Georgia',serif;">
                Hola, ${firstName} 👋
              </p>

              <p style="margin:0 0 20px;color:#5C4A2A;font-size:15px;line-height:1.7;
                font-family:Arial,sans-serif;">
                Gracias por unirte a la comunidad de <strong>Taller de María</strong>.
                Para activar tu cuenta y comenzar a explorar nuestras artesanías sagradas,
                solo debes confirmar tu correo electrónico.
              </p>

              <!-- Separador decorativo -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="margin:0 0 28px;">
                <tr>
                  <td style="border-top:1px solid #E8D5B0;"></td>
                  <td style="padding:0 12px;color:#B07D00;font-size:16px;white-space:nowrap;">✦</td>
                  <td style="border-top:1px solid #E8D5B0;"></td>
                </tr>
              </table>

              <!-- Botón CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0"
                style="margin:0 auto 28px;">
                <tr>
                  <td style="border-radius:10px;background:linear-gradient(135deg,#7E5700,#B07D00);
                    box-shadow:0 4px 14px rgba(126,87,0,0.30);">
                    <a href="${verificationUrl}"
                      target="_blank"
                      style="display:inline-block;padding:14px 36px;color:#FFFFFF;
                        font-size:15px;font-weight:700;text-decoration:none;
                        font-family:Arial,sans-serif;letter-spacing:0.3px;
                        border-radius:10px;">
                      ✓ &nbsp;Confirmar mi cuenta
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;color:#7A6240;font-size:13px;line-height:1.6;
                font-family:Arial,sans-serif;text-align:center;">
                Este enlace expirará en <strong>24 horas</strong>.<br/>
                Si no creaste esta cuenta, puedes ignorar este correo.
              </p>

              <!-- URL de respaldo -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#FDF8EE;border-radius:8px;border:1px solid #E8D5B0;
                  margin:0 0 8px;">
                <tr>
                  <td style="padding:12px 16px;">
                    <p style="margin:0 0 4px;color:#7A6240;font-size:11px;
                      font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.5px;">
                      O copia este enlace en tu navegador:
                    </p>
                    <p style="margin:0;color:#7E5700;font-size:12px;
                      word-break:break-all;font-family:'Courier New',monospace;">
                      ${verificationUrl}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FDF8EE;padding:20px 40px;text-align:center;
              border-top:1px solid #E8D5B0;">
              <p style="margin:0;color:#A08060;font-size:12px;font-family:Arial,sans-serif;
                line-height:1.5;">
                © ${new Date().getFullYear()} Taller de María · Todos los derechos reservados<br/>
                Este es un correo automático, por favor no respondas a este mensaje.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
  <!-- /Wrapper -->

</body>
</html>
  `.trim();
}

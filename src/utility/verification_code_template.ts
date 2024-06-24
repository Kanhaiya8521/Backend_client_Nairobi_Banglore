export const verificationCodeTemplate = (
  name: string,
  email: string,
  verify_code: string
) => {
  const body_html = `
    <strong>Hey, there</strong> ${name},
    <p>Thank you for joining us</p>  
    <br/>
    <h4>Verification Code</h4>
    <br/>
    <p>Your verification code is: <strong>${verify_code}</strong></p>
    <br/>
    <br/>
    <strong>Thank you,</strong>
    <p>${process.env.APP_NAME} team work<p>
   `;

  return {
    email: email,
    title: ("Verification code For " + process.env.APP_NAME) as string,
    body: body_html,
  };
};

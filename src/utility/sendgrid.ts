import sgMail from "@sendgrid/mail";

const sendMail = async (mailData: any) => {
  console.log(" mailData.email", mailData.email);
  try {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);
    const msg = {
      to: mailData.email, // Change to your recipient
      from: "kanhaiya15399@gmail.com", // Change to your verified sender
      subject: "kanna",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>from kanna</strong>",
    };
    const mail_res = await sgMail.send(msg);
    return {
      success: true,
      message: "Mail sent successfully",
      content: mail_res[0],
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendSingleMail = async (mail_data: any) => {
  let bccEmails: { email: string }[] = [];
  let toEmail: { email: string }[] = [];

  if (Array.isArray(mail_data.email)) {
    const RECIPIENT_EMAILS = [...new Set([mail_data.email].flat())];

    RECIPIENT_EMAILS.forEach((email: string, index: number) => {
      if (index === 0) {
        toEmail.push({ email });
      }
      if (index !== 0) {
        bccEmails.push({ email });
      }
    });
  } else {
    toEmail.push({ email: mail_data.email });
  }

  const mail = {
    personalizations: [
      {
        to: toEmail,
        ...(bccEmails.length && { bcc: bccEmails }),
      },
    ],
    ...(mail_data.templateId
      ? {
          templateId: mail_data.templateId,
          dynamic_template_data: {
            subject: mail_data.title,
            name: mail_data.name,
            footerAppName: (mail_data.appName as string).split(" ")[0],
          },
        }
      : {
          subject: mail_data.title,
          html: mail_data.body,
        }),
  };
  return await sendMail(mail);
};

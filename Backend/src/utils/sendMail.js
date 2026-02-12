import Brevo from "@getbrevo/brevo";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY,
    );

    await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "Car Rental",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("Email sent successfully via Brevo API");
  } catch (error) {
    console.error("Brevo API error:", error.response?.body || error);
    throw error;
  }
};



// Example sendEmail.js

import nodemailer from "nodemailer";

 const sendEmail = async ({ email, subject, message }) => {
  try {
    if (!email) throw new Error("Recipient email is missing");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    const mailOptions = {
      from: `"VegPack" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial; padding: 15px;">
          <h2>${subject}</h2>
          <p>${message}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;

  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Unable to send email");
  }
};

export default sendEmail;

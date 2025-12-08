// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, text }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent to", to);
//   } catch (err) {
//     console.error("❌ Error sending email:", err);
//     throw new Error("Email sending failed");
//   }
// };

// export default sendEmail;


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

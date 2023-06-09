import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

// https://ethereal.email/create
let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

// Configure mailgen by setting a theme and your product info
let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Body of the email
  let infoEmail = {
    body: {
      name: username,
      intro:
        text || "Welcome to Mailgen! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  // Generate an HTML email with the provided contents
  let emailBody = MailGenerator.generate(infoEmail);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  // Send email
  transporter
    .sendMail(message)
    .then(() => {
      res.status(200).json({
        message: "You should receive an email shortly",
      });
    })
    .catch((error) =>
      res.status(500).json({
        message: error.message,
      })
    );
};

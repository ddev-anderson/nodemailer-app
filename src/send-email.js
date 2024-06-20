import nodemailer from "nodemailer";
import { default as hbs } from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: path.join(__dirname, "templates"),
      defaultLayout: false,
      partialsDir: path.join(__dirname, "templates"),
    },
    viewPath: path.join(__dirname, "templates"),
    extName: ".hbs",
  })
);

const sendWelcomeEmail = (to, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Welcome to Our Service!",
    template: "emails/welcome",
    context: {
      name: name,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

export default sendWelcomeEmail;

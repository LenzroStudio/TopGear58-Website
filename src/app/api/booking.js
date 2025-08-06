import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    phone,
    serviceType,
    carBrand,
    year,
    preferredDate,
    preferredTime,
    message,
  } = req.body;

  // Configure your SMTP transporter (use environment variables in production)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email to admin
  const adminMailOptions = {
    from: `TopGear58 Booking <${process.env.SMTP_USER}>`,
    to: "info@topgear58.com",
    subject: `New Booking from ${name}`,
    html: `
      <h2>New Booking Details</h2>
      <ul>
        <li><b>Name:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Phone:</b> ${phone}</li>
        <li><b>Service Type:</b> ${serviceType}</li>
        <li><b>Car Brand:</b> ${carBrand}</li>
        <li><b>Year:</b> ${year}</li>
        <li><b>Date:</b> ${preferredDate}</li>
        <li><b>Time:</b> ${preferredTime}</li>
        <li><b>Message:</b> ${message || "-"}</li>
      </ul>
    `,
  };

  // Email to user
  const userMailOptions = {
    from: `TopGear58 <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your TopGear58 Appointment Has Been Received",
    html: `
      <h2>Thank you for booking with TopGear58!</h2>
      <p>Your appointment request has been received. Our team will contact you soon to confirm your booking.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><b>Service Type:</b> ${serviceType}</li>
        <li><b>Car Brand:</b> ${carBrand}</li>
        <li><b>Year:</b> ${year}</li>
        <li><b>Date:</b> ${preferredDate}</li>
        <li><b>Time:</b> ${preferredTime}</li>
      </ul>
      <p>If you have any questions, reply to this email or call us at (your phone number).</p>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send emails." });
  }
}

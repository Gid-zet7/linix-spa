import Mailgun from "mailgun.js";
import FormData from "form-data";
import { NextResponse } from "next/server";

// Ensure API key and domain are set
const API_KEY = process.env.MAILGUN_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

if (!API_KEY || !DOMAIN) {
  throw new Error(
    "Mailgun API key or domain is not set in environment variables"
  );
}

export const POST = async (request: Request) => {
  try {
    const { email, htmlContent } = await request.json();

    // if (
    //   !last_name ||
    //   !first_name ||
    //   !phone_number ||
    //   !date ||
    //   !time ||
    //   !service_type
    // ) {
    //   return NextResponse.json(
    //     { error: "Missing required fields (emailTo, subject, message)" },
    //     { status: 400 }
    //   );
    // }

    // Initialize Mailgun
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: API_KEY,
    });

    // Send email
    const result = await mg.messages.create(DOMAIN, {
      from: email,
      to: ["adontenggideon57@gmail.com", "linixspaandsalon@gmail.com"],
      subject: "New appointment",
      html: htmlContent,
    });

    // Log and return success response
    console.log("Mail sent:", result);
    return NextResponse.json(
      { success: true, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: `Failed to send email: ${error}` },
      { status: 500 }
    );
  }
};

import { connectDB } from "@/db/mongodb";
import UserModel from "@/db/models/appointments";

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();

    // Get form fields
    const email = formData.get("email") as string;
    const last_name = formData.get("last_name") as string;
    const first_name = formData.get("first_name") as string;
    const phone_number = parseFloat(formData.get("phone_number") as string);
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const service_type = formData.get("service_type") as string;

    // Validate required fields
    if (!last_name || !first_name || !phone_number || !time || !service_type) {
      return new Response(
        "All fields are required, including at least one image",
        { status: 400 }
      );
    }

    await connectDB();

    const productObj = {
      email,
      last_name,
      first_name,
      phone_number,
      date,
      time,
      service_type,
    };

    const appointment = await UserModel.create(productObj);

    if (appointment) {
      return new Response(JSON.stringify({ message: "success" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {
    // console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

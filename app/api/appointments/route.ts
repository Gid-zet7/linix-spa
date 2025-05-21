import { connectDB } from "@/db/mongodb";
import UserModel from "@/db/models/appointments";

export const GET = async () => {
  try {
    await connectDB();

    const appointments = await UserModel.find().sort({ createdAt: -1 }).lean();

    if (appointments?.length === 0) {
      return new Response("No appointments posted yet", { status: 404 });
    }

    return new Response(JSON.stringify(appointments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response("Failed to fetch appointments", { status: 500 });
  }
};

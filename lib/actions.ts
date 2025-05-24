const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api";

export const getAllAppointments = async () => {
  const endpoint = `${SERVER_URL}/appointments`;
  const result = await fetch(endpoint, {
    method: "GET",
  });
  if (!result.ok) {
    const errorMessage = `Failed to fetch appointments. Status: ${result.status}, ${result.statusText}`;
    throw new Error(errorMessage);
  }
  const appointments = await result.json();
  return appointments;
};

export const bookNew = async (formData: FormData) => {
  const endpoint = `${SERVER_URL}/book-new`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const errorMessage = `Failed to book appointment. Status: ${res.status}, ${res.statusText}`;
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
};

export const sendEmail = async (email: string, htmlContent: string) => {
  const endpoint = `${SERVER_URL}/mailgun`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server response:", errorText);
      return undefined;
    }

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return undefined;
  }
};

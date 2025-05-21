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

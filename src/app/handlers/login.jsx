import axios from "axios";

export async function loginUser(username, password) {
  try {
    const response = await axios.post("/api/login", {
      email: username,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

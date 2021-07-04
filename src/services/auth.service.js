import axios from "axios";

export async function signup({ name, email, password }) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/auth/signup",
      {
        name: name,
        email: email,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(
      "https://dev-stream-api.hntejas.repl.co/auth/login",
      {
        email: email,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
    return {
      success: false,
      error: {
        message: "Something went wrong! Please try again",
      },
    };
  }
}

import { AxiosError } from "axios";
import { toast } from "react-toastify";


// Generic function to handle Axios errors
export const handleAxiosError = (error: unknown) => {
  const err = error as AxiosError<{ message: string }>;
  const message = err.response?.data?.message || "Something went wrong";
  toast.error(message);
  console.error("Axios Error:", err);
};

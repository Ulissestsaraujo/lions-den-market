import axios from "axios";

export const registerUser = async (formData: FormData) => {
  await axios.post(`/user/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

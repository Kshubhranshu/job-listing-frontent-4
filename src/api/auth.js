import axios from "axios";
const backendUrl = `http://localhost:3001/api/v1/auth`;

export const registerUser = async ({ email, password, mobile, name }) => {
    try {
        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl, {
            name,
            password,
            mobile,
            email,
        });
        return;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl, {
            password,
            email,
        });
        if (response.data?.token) {
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("name", JSON.stringify(response.data?.name));
            localStorage.setItem(
                "userId",
                JSON.stringify(response.data?.userId)
            );
        }
        return true;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

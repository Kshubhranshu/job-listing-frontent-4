import axios from "axios";
const backendUrl = `http://localhost:3001/api/v1/job`;

export const createJobPost = async (jobPostPayload) => {
    try {
        const reqUrl = `${backendUrl}/create`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = axios.post(reqUrl, jobPostPayload);
        console.log(response.data.status);
    } catch (error) {
        // console.log(error.response.status);
        // if (error.response.status === 401) {
        //     localStorage.clear();
        //     Navigate("/login");
        // }
        console.log(error);
        alert("Something went wrong");
    }
};

export const jobPostDetailsById = async (jobId, userId) => {
    try {
        const reqUrl = `${backendUrl}/job-details/${jobId}/${userId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
};

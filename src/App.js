import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import JobPostPage from "./pages/JobPostPage/JobPostPage";
import JobDescriptionPage from "./pages/JobDescriptionPage/JobDescriptionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/job-post"
                    element={<ProtectedRoute Component={JobPostPage} />}
                />
                <Route
                    path="/job-details/:id"
                    element={<JobDescriptionPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

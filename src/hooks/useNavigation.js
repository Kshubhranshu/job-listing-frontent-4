import React from "react";
import { useNavigate } from "react-router-dom";

export default function useNavigation() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return { navigateToLogin };
}

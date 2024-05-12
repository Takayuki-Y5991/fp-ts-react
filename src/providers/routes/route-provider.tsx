import { Login } from "@/pages/login";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./protected-route";

interface ReactRouterProviderProp {
    children: React.ReactNode
}

// TODO: FIX Routings 
export const ReactRouterProvider = ({ children }: ReactRouterProviderProp) => {
    return <Router>
        {children}
        <Routes>
            <Route path="/" element={<div>TEST</div>} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/test" element={<div>TESTA</div>} />
            </Route>
        </Routes>
    </Router>
}
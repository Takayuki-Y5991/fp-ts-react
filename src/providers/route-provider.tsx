import React from "react";
import { BrowserRouter } from "react-router-dom";

interface ReactRouterProviderProp {
    children: React.ReactNode
}

export const ReactRouterProvider = ({ children }: ReactRouterProviderProp) => {
    return <BrowserRouter>
        {children}
    </BrowserRouter>
}
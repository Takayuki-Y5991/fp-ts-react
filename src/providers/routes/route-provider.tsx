import { NotFound } from '@/features/NotFount'
import { SignIn } from '@/features/sign-in/SignIn'
import { ProtectedRoutes } from '@/providers/routes/protected-route'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// TODO: FIX Routings
export const ReactRouterProvider = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>TEST</div>} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<div>TESTA</div>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

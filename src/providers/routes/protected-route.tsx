import { useAuthStore } from '@/stores/auth.store'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {
    const user = useAuthStore.getState().user
    return user ? <Outlet /> : <Navigate to="/login" replace />
}

import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

// REVIEW: After Design fix
export const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className={'flex flex-col items-center justify-center min-h-screen text-center'}>
            <h1 className={'text-9xl font-bold text-gray-100 mb-4'}>404</h1>
            <p className={'text-2xl text-gray-100 mb-8'}>
                The page you are looking for could not be found.
            </p>
            <Button onClick={() => navigate(-1)}>back previous page</Button>
        </div>
    )
}

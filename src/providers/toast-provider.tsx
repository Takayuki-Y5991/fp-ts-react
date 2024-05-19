// ToastProvider.tsx
// ToastProvider.tsx
import { ToastProvider as ShadcnToastProvider, ToastViewport } from '@/components/ui/toast'
import { useToast as useToastBase } from '@/components/ui/use-toast'
import { ReactNode, createContext, useContext } from 'react'

interface ToastContextType {
    toast: ReturnType<typeof useToastBase>['toast']
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const useToastContext = (): ToastContextType => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider')
    }
    return context
}

interface ProviderProps {
    children: ReactNode
}

export const ToastProvider = ({ children }: ProviderProps) => {
    const { toast } = useToastBase()

    return (
        <ToastContext.Provider value={{ toast }}>
            <ShadcnToastProvider>
                {children}
                <ToastViewport />
            </ShadcnToastProvider>
        </ToastContext.Provider>
    )
}

export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning'

export const useToast = () => {
    const { toast } = useToastContext()

    return ({
        title,
        description,
        variant = 'default',
    }: {
        title: string
        description?: string
        variant?: ToastVariant
    }) => {
        toast({
            title,
            description,
            variant,
        })
    }
}

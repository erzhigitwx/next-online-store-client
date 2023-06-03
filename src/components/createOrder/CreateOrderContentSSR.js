import dynamic from 'next/dynamic'

export const CreateOrderContentSSR = dynamic(() =>
    import('./CreateOrderContent'),
    { ssr: false }
)
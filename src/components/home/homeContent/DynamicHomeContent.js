import dynamic from 'next/dynamic';

export const DynamicHomeContent = dynamic(
    () => import('@/components/home/homeContent/HomeContent'),
    { ssr: false }
)
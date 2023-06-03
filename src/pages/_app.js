import { store } from "@/store";
import "../styles/globals.scss"
import { Provider } from "react-redux";
import ErrorBoundary from "@/security/security";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from 'next/router';
import SideBar from "@/components/navbar/SideBar";

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const isAuthPage = router.pathname === '/authorization' || router.pathname === '/login';

    return (
        <ErrorBoundary>
            <Provider store={store}>
                {!isAuthPage && <Navbar />}
                <div>
                    {isAuthPage && <Component {...pageProps} /> || <div className="page"><SideBar /><Component {...pageProps} /></div>}
                </div>
            </Provider>
        </ErrorBoundary>
    );
}
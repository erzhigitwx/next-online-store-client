import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import "../styles/home.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '@/utils/getData'
import { setUser } from '@/store/User'
import { DynamicHomeContent } from '@/components/home/homeContent/DynamicHomeContent'

const HomePage = ({ orders }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.authorization)
    const { emailLog } = useSelector((state) => state.login)

    async function settingUser() {
        const users = await getData("https://next-online-store-api-production.up.railway.app/users");
        const userKeys = Object.keys(users)
        userKeys.forEach((item) => {
            if (users[item].email === email || users[item].email === emailLog) {
                dispatch(setUser(users[item]))
                localStorage.setItem("user", JSON.stringify(users[item]))
            }
        })
    }


    useEffect(() => {
        settingUser().then(() => autoRouter())
    }, [dispatch])

    function autoRouter() {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.isAuth) {
            router.replace("/");
        } else {
            router.replace("/authorization");
        }
    }
    return (
        <div className="home">
            <DynamicHomeContent orders={orders} />
        </div>
    )
}

export default HomePage

export async function getServerSideProps() {
    const result = await getData("https://next-online-store-api-production.up.railway.app/orders")

    return {
        props: {
            orders: result
        }
    }
}
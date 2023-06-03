import React, { useEffect, useState } from 'react'
import "../../../styles/login.scss"
import TextInput from '../auth/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { setLogEmail, setLogPassword } from '@/store/login'
import Link from 'next/link'
import Button from '@/components/Button'
import { getData } from '@/utils/getData'
import { useRouter } from 'next/router'

const LoginContent = () => {
    const dispatch = useDispatch();
    const { emailLog, passwordLog } = useSelector((state) => state.login);
    const [isInvalid, setIsInvalid] = useState(false)
    const router = useRouter()
    const changeHandlers = {
        changeLogEmail: (e) => {
            dispatch(setLogEmail(e.target.value))
        },
        changeLogPassword: (e) => {
            dispatch(setLogPassword(e.target.value))
        }
    }

    async function handlerSubmit(e) {
        const result = await getData("https://next-online-store-api-production.up.railway.app/users");
        const users = Object.values(result);
        const foundUser = users.find(user =>
            user.email === emailLog && user.password === passwordLog
        );

        if (foundUser) {
            router.push("/");
        } else {
            setIsInvalid(true);
        }
    }
    return (
        <div>
            <h1 className='login-title'>Log in</h1>
            <div className="login-content">
                <TextInput value={emailLog} text={"email"} onChange={changeHandlers.changeLogEmail} />
                <TextInput value={passwordLog} text={"password"} type='password' onChange={changeHandlers.changeLogPassword} />
                {isInvalid && <div className='login-error'>there is no such user or the data was entered incorrectly</div>}
                <div className="login-links">
                    <Link href={"/authorization"}>
                        I haven't an account
                    </Link>
                    <Button text={"log in"} onSubmit={(e) => handlerSubmit(e)} />
                </div>
            </div>
        </div>
    )
}

export default React.memo(LoginContent)
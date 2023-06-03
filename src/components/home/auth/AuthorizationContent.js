import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setIsAuth, setPassword, setRePassword, setUsername } from '@/store/auth';
import Button from '@/components/Button';
import TextInput from '@/components/home/auth/TextInput';
import Link from 'next/link';
import '../../../styles/auth.scss';
import { submitHandler } from '@/utils/submit';
import { useRouter } from 'next/router';
import { setUser } from '@/store/User';

const Authorization = () => {
    const dispatch = useDispatch();
    const { username, email, password, rePassword, isAuth } = useSelector((state) => state.authorization);
    const inputs = useSelector((state) => state.authorization)
    const [error, setError] = useState({})
    const [_, setFormSumbitted] = useState(false)
    const router = useRouter()

    const values = {
        username,
        email,
        password,
        rePassword,
    };

    const changeHandlers = {
        changeUsername: (e) => {
            dispatch(setUsername(e.target.value))
        },
        changeEmail: (e) => {
            dispatch(setEmail(e.target.value))
        },
        changePassword: (e) => {
            dispatch(setPassword(e.target.value))
        },
        changeRePassword: (e) => {
            dispatch(setRePassword(e.target.value))
        }
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('User name required')
            .max(15, 'The user name must not exceed 15 characters')
            .matches(/^\S*$/, 'No spaces are allowed in the username'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email format'),
        password: Yup.string()
            .required('Password required')
            .min(5, 'The password must contain at least 5 characters')
            .max(12, 'The password must contain a maximum of 12 characters')
            .matches(
                /^(?=.*[a-zA-Z])(?=.*\d)/,
                'The password must contain at least one letter and one digit'
            ),
        rePassword: Yup.string()
            .required('A repeated password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    useEffect(() => {
        dispatch(setIsAuth(true))
    }, [submitHandler])

    const handleSubmit = async (e) => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            // Validation successful
            setError({})
            setFormSumbitted(true)
            submitHandler(e, inputs);
            dispatch(setUser(inputs))
            router.push("/login")
        } catch (error) {
            // Validation failed
            const errors = error.inner.reduce((errorObject, validationError) => {
                errorObject[validationError.path] = validationError.message;
                return errorObject;
            }, {});

            dispatch(setIsAuth(false));
            setError({ ...errors })
        }
    };

    return (
        <Formik
            initialValues={values}
            validationSchema={validationSchema}
        >
            <Form>
                <h1 className="authorization-title">Authorization</h1>
                <div className="authorization-content">
                    <TextInput value={inputs.username} text="username" name="username" onChange={changeHandlers.changeUsername} />
                    {!!error.username && <div className="authorization-error">{error.username}</div>}
                    <TextInput value={inputs.email} text="email" type="email" name="email" onChange={changeHandlers.changeEmail} />
                    {!!error.email && <div className="authorization-error">{error.email}</div>}
                    <TextInput value={inputs.password} text="pin" type="password" name="password" onChange={changeHandlers.changePassword} />
                    {!!error.password && <div className="authorization-error">{error.password}</div>}
                    <TextInput value={inputs.rePassword} text="retype pin" type="password" name="rePassword" onChange={changeHandlers.changeRePassword} />
                    {!!error.rePassword && <div className="authorization-error">{error.rePassword}</div>}
                    <div className="authorization-links">
                        <Link href="/login">I already have an account</Link>
                        <Button text="sign up" onSubmit={(e) => handleSubmit(e)} />
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default Authorization;
import React, { useEffect, useState } from 'react'
import Title from '../Title'
import TextInput from '../home/auth/TextInput'
import * as Yup from "yup";
import Link from 'next/link';
import { useRouter } from 'next/router';

const FilterContent = ({ orders }) => {
    const [from, setFrom] = useState("5");
    const [to, setTo] = useState("100");
    const [error, setError] = useState(null)
    const [suitable, setSuitable] = useState(null)
    const router = useRouter();


    const initialValues = {
        from: from,
        to: to
    }
    const validateSchema = Yup.object().shape({
        from: Yup.string()
            .required("you need to set the initial price")
            .test('is-number', 'Price should be a number', value => !isNaN(value) && value.trim() !== '')
            .test('min', "The price must be more than 5", value => Number(value) >= 5)
            .test('max', "The price should be less than 150,000", value => Number(value) <= 150000),
        to: Yup.string()
            .required("you need to set the final price")
            .test('is-number', 'Price should be a number', value => !isNaN(value) && value.trim() !== '')
            .test('min', "The price must be more than 5", value => Number(value) >= 5)
            .test('max', "The price should be less than 150,000", value => Number(value) <= 150000)
    })



    async function activateParams() {
        try {
            await validateSchema.validate(initialValues, { abortEarly: false })
            // success
            const ordersArray = Object.values(orders);
            const sortedOrders = ordersArray.filter((item) => Number(item.price) >= from && Number(item.price) <= to)
            setError({})
            setSuitable([...sortedOrders])
        } catch (error) {
            // error
            const errors = error?.inner?.reduce((errorObject, validationError) => {
                errorObject[validationError.path] = validationError.message;
                return errorObject;
            }, {});
            setError({ ...errors });
        }
    }

    useEffect(() => {
        activateParams()
    }, [from, to])

    return (
        <div className="filter-content">
            <Title text={"Filter"} />
            <div className="filter-content__params">
                <div className="filter-content__params-item">
                    <TextInput text={"start"} placeholder='from 5$' value={from} onChange={(e) => setFrom(Number(e.target.value))} />
                    {error?.from && <p>{error?.from}</p>}
                </div>
                <div className="filter-content__params-item">
                    <TextInput text={"finish"} placeholder='from 150.000$' value={to} onChange={(e) => setTo(Number(e.target.value))} />
                    {error?.to && <p>{error?.to}</p>}
                </div>
            </div>
            {suitable?.length && (
                <div className="filter-content__inner">
                    {suitable?.map((order) => (
                        <Link href={`${router.asPath}/${order.orderId}`} key={order.orderId}>
                            <div className="filter-content__inner-block">
                                <div className='filter-content__inner-block__image'>
                                    <img src={order.image} alt='order image' />
                                </div>
                                <div className="filter-content__inner-block__content">
                                    <p>{order.title}</p>
                                    <div className="filter-content__inner-block__content-price">
                                        <h2>Price: </h2>
                                        <p>{order.price}$</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) || null}
        </div>
    )
}

export default React.memo(FilterContent)
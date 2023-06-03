import React, { useRef, useState } from 'react'
import Title from '../Title'
import upload from "../../../public/images/orders/upload.png"
import Image from 'next/image'
import TextInput from '../home/auth/TextInput'
import Button from '../Button'
import { setCategory, setDescribe, setImage, setPhone, setPrice, setTitle } from '@/store/order'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { Form, Formik } from 'formik'
import { getData } from '@/utils/getData'
import { v4 as uuidv4 } from 'uuid';

const CreateOrderContent = () => {
    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);
    const [error, setError] = useState({})
    const order = useSelector((state) => state.order)

    const validateOrder = Yup.object().shape({
        title: Yup.string()
            .required("The title is required")
            .max(20, "The title must be less than 20 characters"),
        image: Yup.string()
            .required("An image is requires"),
        describe: Yup.string()
            .required("Description of the order is required")
            .max(200, "The description must be less than 200 characters"),
        phone: Yup.string()
            .required("The phone number is required")
            .test('is-number', 'Phone number should be a number', value => !isNaN(value)),
        price: Yup.string()
            .required('Price is required')
            .test('is-number', 'Price should be a number', value => !isNaN(value) && value.trim() !== '')
            .test('min', "The price must be more than 5", value => Number(value) >= 5)
            .test('max', "The price should be less than 150,000", value => Number(value) <= 150000)
    })

    const changeHandlers = {
        setTitle: (e) => {
            dispatch(setTitle(e.target.value))
        },
        setImage: (image) => {
            dispatch(setImage(image))
        },
        setCategory: (e) => {
            dispatch(setCategory(e.target.value))
        },
        setDescribe: (e) => {
            dispatch(setDescribe(e.target.value))
        },
        setPhone: (e) => {
            dispatch(setPhone(e.target.value))
        },
        setPrice: (e) => {
            dispatch(setPrice(e.target.value))
        }
    }


    function clearOrderData() {
        dispatch(setTitle(""))
        dispatch(setImage(null))
        dispatch(setDescribe(""))
        dispatch(setPhone(""))
        dispatch(setPrice(""))
    }
    // /////////////////////////////////////////////////SEND ORDER DATA TO BASE/////////////////////////////////////////////////////////////////////////////

    const sendOrder = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("user"))
        try {
            await validateOrder.validate(order, { abortEarly: false })
            //succesful
            setError({})
            const data = await getData("https://next-online-store-api-production.up.railway.app/orders")
            const response = await fetch("https://next-online-store-api-production.up.railway.app/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    [order.title]: {
                        ...order,
                        username: user.username,
                        uuid: user.id,
                        orderId: uuidv4()
                    }
                })
            })
            clearOrderData()
        } catch (error) {
            const errors = error?.inner?.reduce((errorObject, validationError) => {
                errorObject[validationError.path] = validationError.message;
                return errorObject;
            }, {});
            setError({ ...errors })
        }
    }

    // /////////////////////////////////////////////////SEND ORDER DATA TO BASE/////////////////////////////////////////////////////////////////////////////
    const handleDrop = (event, from) => {
        event.preventDefault();
        try {
            const file = from === "drop" ? event.dataTransfer.files[0] : event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    changeHandlers.setImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleClick = event => {
        hiddenFileInput?.current?.click();
    };
    const doubleClickHandler = () => {
        changeHandlers.setImage(null)
    }

    return (
        <div className="create-order">
            <Formik initialValues={order} validationSchema={validateOrder}>
                <>
                    <Title text={"Create Order"} />
                    <Form>
                        <div className="create-order__content">
                            <div className="create-order__item-wrapper">
                                <div className="create-order__content-top"
                                    onDrop={(e) => handleDrop(e, "drop")}
                                    onDragOver={handleDragOver}
                                    onDoubleClick={doubleClickHandler}
                                    onClick={handleClick}>
                                    {order.image &&
                                        <img src={order.image} alt="order" className="create-order__content-top__image" onDrop={handleDrop} onDragOver={handleDragOver} /> ||
                                        <>
                                            <Image src={upload} alt={"upload"} width={100} height={100} onDrop={handleDrop} onDragOver={handleDragOver} />
                                            <li onDrop={handleDrop} onDragOver={handleDragOver}>Upload image</li>
                                            <input
                                                type="file"
                                                ref={hiddenFileInput}
                                                onChange={(e) => handleDrop(e, "change")}
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                            />
                                        </>}
                                </div>
                                {!!error.image && <p className='create-order__error'>{error.image}</p>}
                            </div>
                            <div className="create-order__content-mid">
                                <div className="create-order__item-wrapper">
                                    <TextInput value={order.title} type='text' text={"Title"} onChange={(e) => changeHandlers.setTitle(e)} />
                                    {!!error.title && <p className='create-order__error'>{error.title}</p>}
                                </div>
                                <div className="text-input">
                                    <h2 className='text'>Category</h2>
                                    <select name="caregory" className='select' value={order.category} onChange={(e) => changeHandlers.setCategory(e)}>
                                        <option value="techElec">Technics and Electronics</option>
                                        <option value="furnitures">Furnitures</option>
                                        <option value="mechanics">Mechanics</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                                <div className="create-order__item-wrapper">
                                    <div className="text-input describe">
                                        <h2 className='text'>Describe</h2>
                                        <textarea name="describe" id="describe" cols="30" rows="10" value={order.describe} onChange={(e) => changeHandlers.setDescribe(e)}></textarea>
                                    </div>
                                    {!!error.describe && <p className='create-order__error'>{error.describe}</p>}
                                </div>
                                <div className='create-order__item-wrapper'>
                                    <TextInput value={order.phone} text={"Phone number"} onChange={(e) => changeHandlers.setPhone(e)} placeholder={"+1-212-456-7890"} />
                                    {!!error.phone && <p className='create-order__error'>{error.phone}</p>}
                                </div>
                                <div className='create-order__item-wrapper'>
                                    <TextInput value={order.price} text={"Price"} onChange={(e) => changeHandlers.setPrice(e)} placeholder='from 5$ to 150,000$' />
                                    {!!error.price && <p className='create-order__error'>{error.price}</p>}
                                </div>

                            </div>
                            <div className="create-order__content-button">
                                <Button text={"Submit"} onSubmit={(e) => sendOrder(e)} />
                            </div>
                        </div>
                    </Form>
                </>
            </Formik>
        </div >
    )
}

export default CreateOrderContent
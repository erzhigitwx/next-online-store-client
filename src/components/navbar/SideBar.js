import React, { useState } from 'react'
import arrowDown from "../../../public/images/panel/arrowDown.png"
import Image from 'next/image'
import Link from 'next/link'


const SideBar = () => {
    const [isCategory, setIsCategory] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [isOrder, setIsOrder] = useState(false)
    return (
        <div className="sidebar">
            <div className='sidebar-home'>
                <Link href={"/"}>
                    <li >Home</li>
                </Link>
            </div>
            <div className='sidebar-item'>
                <div className='sidebar-item__links' onClick={() => setIsCategory(!isCategory)}>
                    <p>Categories</p>
                    <div className='sidebar-item__img'>
                        <Image src={arrowDown} alt='arrow down' width={17} height={17} />
                    </div>
                </div>
                {isCategory && <div className="sidebar-item__open">
                    <Link href={"/technics-electronics"}>
                        <li>Technics and Electronics</li>
                    </Link>
                    <Link href={"/furnitures"}>
                        <li>Furnitures</li>
                    </Link>
                    <Link href={"/mechanics"}>
                        <li>Mechanics</li>
                    </Link>
                    <Link href={"/other"}>
                        <li>Other</li>
                    </Link>
                </div>}
            </div>
            <div className='sidebar-item'>
                <div className='sidebar-item__links' onClick={() => setIsFilter(!isFilter)}>
                    <p>filter</p>
                    <div className='sidebar-item__img'>
                        <Image src={arrowDown} alt='arrow down' width={17} height={17} />
                    </div>
                </div>
                {isFilter && <div className='sidebar-item__open'>
                    <Link href={"/filter"}>
                        <li>Filter</li>
                    </Link>
                </div>}
            </div>
            <div className='sidebar-item'>
                <div className='sidebar-item__links' onClick={() => setIsOrder(!isOrder)}>
                    <p>My Order</p>
                    <div className='sidebar-item__img'>
                        <Image src={arrowDown} alt='arrow down' width={17} height={17} />
                    </div>
                </div>
                {isOrder && <div className='sidebar-item__open'>
                    <Link href={"/createOrder"}>
                        <li>Create Order</li>
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default React.memo(SideBar)
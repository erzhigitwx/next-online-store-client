import React from 'react'
import Button from '../Button'
import Link from 'next/link'
import basket from "../../../public/images/panel/basket.png"
import profile from "../../../public/images/panel/profile.png"
import search from "../../../public/images/panel/search.png"
import Image from 'next/image'


const Navbar = () => {
    return (
        <header className='navbar'>
            <nav className='navbar-content'>
                <div className="navbar-content__button">
                    <Link href={"/login"}>
                        <Button text={"Log out "} width='160px' height='30px' />
                    </Link>
                </div>

                <div className="navbar-content__panel">
                    <Link href={"/search"}>
                        <Image src={search} alt='search' height={30} width={30} />
                    </Link>
                    <Link href={"/basket"}>
                        <Image src={basket} alt='basket' height={30} width={30} />
                    </Link>
                    <Link href={"/profile"}>
                        <Image src={profile} alt='profile' height={30} width={30} />
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default React.memo(Navbar)
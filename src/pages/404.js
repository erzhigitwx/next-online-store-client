import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
    return (
        <div className='page-not__found'>
            <li className='page-not__found-title'>{"page not found ;("}</li>
            <li>Redirect to
                <Link href={'/'} style={{ color: "blue", marginLeft: "10px" }}>
                    Home
                </Link>
            </li>
        </div>
    )
}

export default PageNotFound
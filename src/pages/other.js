import CategoryContent from '@/components/categories/categoryContent'
import React from 'react'
import "../styles/categories.scss"


const Other = () => {
    return (
        <div className="other">
            <CategoryContent nodeName={"other"} title={"Other orders"} />
        </div>
    )
}

export default Other
import CategoryContent from '@/components/categories/categoryContent'
import React from 'react'
import "../styles/categories.scss"

const TechElec = () => {
    return (
        <div className="tech-elec">
            <CategoryContent nodeName={"techElec"} title={"Technics and Electronics"}/>
        </div>
    )
}

export default TechElec
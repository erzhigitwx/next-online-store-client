import React from 'react'

const Title = ({ text }) => {
    return (
        <div className='title'>{text}</div>
    )
}

export default React.memo(Title)
import React, { memo } from 'react'

const Button = ({ text, width = "180px", height = "50px", onSubmit = null }) => {
    return (
        <button className='button' style={{ width: width, height: height }} onClick={onSubmit}>{text}</button>
    )
}

export default memo(Button)
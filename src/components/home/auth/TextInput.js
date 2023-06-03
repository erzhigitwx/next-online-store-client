import React from 'react'

export const TextInput = ({ text, type = "text", onChange, placeholder = "", value }) => {
    return (
        <div className="text-input">
            <h2 className='text'>{text}</h2>
            <input type={type} value={value} className="input" placeholder={placeholder || text} onChange={(e) => onChange(e)} />
        </div>
    )
}

export default React.memo(TextInput)
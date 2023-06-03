import Image from 'next/image'
import React from 'react'
import succes from "../../../public/images/succes.png"

const Succes = () => {
  return (
    <div className="succes">
      <Image src={succes} alt='successful' width={256} height={256} />
      <h1>order is was sended to your home!</h1>
    </div>
  )
}

export default Succes
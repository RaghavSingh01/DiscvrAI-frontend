import React from 'react'

const ProductCard = ({ product }) => {

  if(!product) return null;

const { image, price, name} = product;

  return (
    <div className='text-gray-700 cursor-pointer'  >
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image} alt={name} />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className=' text-sm font-medium'>${price}</p>
    </div>
  )
}

export default ProductCard;

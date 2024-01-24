import React from 'react'

import BestSeller from './home/BestSeller'
import NewProduct from './home/NewProduct'

const Home = () => {
  
  return (
    <div>
      {/* {/NewProduct} */}
      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumboton'>
        สินค้ามาใหม่
      </h4>
      <NewProduct/>



      {/* {/NewProduct} */}
      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumboton'>
        สินค้าขายดี
      </h4>
      <BestSeller/>
    </div>
  )
}

export default Home
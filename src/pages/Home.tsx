import React, { useState } from 'react'
import { useGetProducts } from '../api/products/query'

import Error from '../components/Error';
import { useCreateProduct } from '../api/products/mutate';
import Product from '../api/products/type';

function Home () {
  const {data, error, isLoading, isFetching} = useGetProducts();
  const mutation = useCreateProduct();

  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    description: ""
 })

  async function handleSubmit() {
   await mutation.mutateAsync(formData)
  }

  if(error?.message) return <Error />
  if(isLoading) return <h2 className='font-bold text-lg p-4'>Loading....</h2>

  
  

  return (
    <div>

        <div>
            <div>
                <label htmlFor="">Nama Produk :</label>
                <input type='text' value={formData.name}  onChange={(value) => setFormData((prev) => ({...prev, name: value.target.value}))} />
            </div>

            <div>
                <label htmlFor="">Harga :</label>
                <input type='number' value={formData.price} onChange={(value) => setFormData((prev) => ({...prev, price: parseInt(value.target.value)}))} />
            </div>

            <div>
                <label htmlFor="">Deskripsi :</label>
                <input type='text' value={formData.description} onChange={(value) => setFormData((prev) => ({...prev, description: value.target.value}))}/>
            </div>

            <button onClick={handleSubmit}>Buat Produk!!!</button>
        </div>
        
        
        <ul>
            {data?.map((item) => 
                <li className='border-b p-5'>
                    <p>Name : {item.name}</p>
                    <p>Price : Rp. {item.price}</p>
                    <p>Description : {item.description}</p>
                </li>
            )}
        </ul>
    </div>
  )
}

export default Home
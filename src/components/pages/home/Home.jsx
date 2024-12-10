import React, { useEffect, useState } from 'react'
import HomeHero from './HomeHero'
import api from '../../../api'
import HomeCardContainer from './HomeCardContainer'
import Loading from '../../Loading'


const Home = () => {

  const [products , setProducts] = useState([])
  const [loading , setLoading] = useState(true)


  useEffect(() =>{
    setLoading(true)
    api.get("products/")
    .then(res => {
    console.log(res.data)
    setProducts(res.data)
    setLoading(false)
  })

    .catch(err => {
      console.log(err.message)
      setLoading(true)
    })
  } , [])

  if (loading) {
    return <Loading/>; 
  }
  
  return (
    <div>
         <HomeHero/>
         <HomeCardContainer products = {products} loading = {loading}/>
    </div>
  )
}

export default Home
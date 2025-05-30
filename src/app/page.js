"use client"
import React from 'react'
import Weather from './Components/Weather'

import Link from 'next/link'
import { useCity } from './context/CityContext'


const page = () => {
   const { city } = useCity();
  return (
    <div>

      <Weather/>
      {city.trim() && (
          <Link
  href="/forecast"
  className="mt-2 mb-2 flex justify-center items-center w-[300px] bg-blue-600 text-white px-4 py-2  text-right rounded-md hover:bg-blue-700 transition"
>
  See 5 Days Forecast for {city}
</Link>
      )}
     
      
    </div>
  )
}

export default page
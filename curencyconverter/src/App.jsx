import { useState } from 'react'
import {InputBox} from './components'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
const [amount,setAmounbt]= useState(0)

  return (
    <>
     <h1 className='text-3xl bg-orange-500 p-6'>Currency
       app with chai
      
     </h1>
    </>
  )
}

export default App

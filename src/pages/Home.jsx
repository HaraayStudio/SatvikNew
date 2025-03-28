import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <Link to={"/products"}>products</Link>
      <Link to={"/login"}>Login</Link>
    
    </div>
  )
}


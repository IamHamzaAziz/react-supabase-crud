import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <ul className='bg-gray-900 text-white flex justify-center space-x-5 py-5'>
        <li>
            <Link to={'/'}>Home</Link>
        </li>
        <li>
            <Link to={'/add'}>Add Note</Link>
        </li>
    </ul>
  )
}

export default Header
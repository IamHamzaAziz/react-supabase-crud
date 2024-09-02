import React, { useState } from 'react'
import supabase from '../supabase/supabaseConfig'
import { useNavigate } from 'react-router-dom'

const AddNote = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      alert('Please fill in all fields.')
      return
    }

    const { error } = await supabase
      .from('notes')
      .insert({title: title, description: description})

    if (error) {
      alert('Error Adding Note')
      console.error(error)
      return
    }

    alert('Added successfully')

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className='bg-gray-800 w-1/2 mx-auto my-3 p-10 space-y-3 rounded-xl'>
      <input type="text" 
        placeholder='Note Title' 
        className='block w-full p-3 rounded-lg' 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="text"
        placeholder='Note Description' 
        className='block w-full p-3 rounded-lg' 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type='submit' className='bg-blue-700 text-white block w-full p-3 rounded-lg'>Submit</button>
    </form>
  )
}

export default AddNote
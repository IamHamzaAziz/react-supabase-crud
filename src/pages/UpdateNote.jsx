import React, { useState, useEffect } from 'react'
import supabase from '../supabase/supabaseConfig'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    getNote()
  }, [])

  async function getNote() {
    const { data, error } = await supabase
      .from('notes')
      .select()
      .eq('id', id)

    if (error) {
      alert('Unable to fetch note')
      console.log(error)
      navigate('/')
      return
    }

    console.log(data)
    setTitle(data[0].title)
    setDescription(data[0].description)
  }

  async function updateNote(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('notes')
      .update({ title: title, description: description })
      .eq('id', id)

    if (error) {
      alert('Unable to update')
      console.log(error)
      return
    }

    alert('Note updated successfully')
    navigate('/')
  }

  async function deleteNote() {
    const response = await supabase
      .from('notes')
      .delete()
      .eq('id', id)

    if (response.status === 204) {
      alert('Note deleted successfully')
      navigate('/')
    } else {
      alert('Unable to delete')
      console.log(response.error)
      navigate('/')
    }
  }


  return (
    <div className='bg-gray-800 w-1/2 mx-auto my-3 p-10 space-y-3 rounded-xl'>
      <form onSubmit={updateNote} className='space-y-3'>
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

        <button type='submit' className='bg-blue-700 text-white block w-full p-3 rounded-lg'>Update</button>
      </form>
      
      <button onClick={deleteNote} className='bg-red-600 text-white block w-full p-3 rounded-lg'>Delete</button>
    </div>
  )
}

export default UpdateNote
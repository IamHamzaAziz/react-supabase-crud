import React, { useState, useEffect } from 'react'
import supabase from '../supabase/supabaseConfig'
import { Link } from 'react-router-dom'

const Home = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('notes').select()
        console.log(data)
        if (error) {
            console.error(error)
            setLoading(false)
            return
        }
        setNotes(data)
        setLoading(false)
    }

    return (
        <div className='text-center my-5 space-y-2'>
            {
                notes.length > 0 ? (
                    notes.map(note => (
                        <Link key={note.id} to={`/update/${note.id}`}>
                            <h2 className='font-bold text-xl'>{note.title}</h2>
                        </Link>
                        
                    ))
                ) : (
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>No notes found</p>
                    )
                )
            }
        </div>
    )
}

export default Home
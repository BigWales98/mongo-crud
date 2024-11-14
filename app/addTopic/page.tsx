'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"


export default function AddTopic() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!title || !description) {
      alert('Title and description are required.')
    }
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, description}),
      })
      if(res.ok) {
        router.push('/')
        router.refresh()
      } else {
        throw new Error('Failed to create a topic')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input 
        className="border border-slate-500 p-4"
        type="text"
        placeholder="Topic Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
        />
        <textarea
          className="border border-slate-500 p-4 h-32"
          placeholder="Topic Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        <button className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md">
            Add Topic
        </button>
    </form>
  )
}

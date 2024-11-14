import React from 'react'
import TopicsList from '@/components/TopicsList'

export default function Home() {
  return (
    <div>
      <h1 className='text-3x1 font-bold'>WebDev Topics</h1>
        <p className='mb-4'>MongoDB CRUD Example</p>
        <TopicsList />
        <TopicsList />      
    </div>
  )
}

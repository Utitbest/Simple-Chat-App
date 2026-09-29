import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const {messages, setMessge, selectedConversation} = useConversation();

  useEffect(()=>{
    const getMessages = async()=>{
        setLoading(true)
        
        try {
            const res = await fetch(`/api/message/${selectedConversation._id}`)
            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }
            setMessge(data)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    if(selectedConversation?._id) getMessages()
  }, [selectedConversation?._id, setMessge])

  return {messages, loading}
}

export default useGetMessages
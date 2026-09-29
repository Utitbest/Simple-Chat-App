import React, { useEffect } from 'react'
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"
import notifciationSound from "../assets/notification.mp3"
const useListenMessage = () => {
   const { socket } = useSocketContext()
   const {messages, setMessge} = useConversation()
   useEffect(()=>{
    socket?.on("newMessage", (newMessage)=>{
        newMessage.shouldShake = true;
        const sound = new Audio(notifciationSound)
        sound.play()
        setMessge([...messages, newMessage])
    })
    
    return ()=> socket.off("newMessage")
   }, [ socket, messages, setMessge])
}

export default useListenMessage;
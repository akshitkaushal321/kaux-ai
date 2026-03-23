"use client"

import { useRouter } from "next/navigation"

export default function ChatHeader() {
  const router = useRouter()

  return (
    <div className="chatHeader">

      <button
        className="backButton"
        onClick={() => router.push("/")}
      >
       ←
      </button>
      
      <span className="chat-logo">
        Beta 1.0 version
      </span>


    </div>
  )
}
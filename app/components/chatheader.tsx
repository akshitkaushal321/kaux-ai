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
      

    </div>
  )
}
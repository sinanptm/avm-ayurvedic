'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ChatLayout({
  chatList,
  chat,
}: {
  chatList: ReactNode
  chat: ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isInChatView = pathname.startsWith('/chats/')

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside
        className={`${
          isInChatView ? 'hidden sm:block' : 'block'
        } w-full sm:w-64 md:w-80 border-r border-border overflow-hidden flex-shrink-0`}
      >
        {chatList || <div className="p-4">Loading chat list...</div>}
      </aside>
      <main
        className={`${
          isInChatView ? 'block' : 'hidden sm:block'
        } flex-1 overflow-hidden`}
      >
        {chat || (
          <div className="h-full flex items-center justify-center text-center p-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Welcome to Your Messages</h2>
              <p className="text-sm text-muted-foreground">
                Select a chat to start messaging or create a new one.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
import { ReactNode } from 'react';

export default function ChatLayout({
  chatList,
  chat,
}: {
  chatList: ReactNode;
  chat: ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-16 sm:w-64 md:w-80 border-r border-border overflow-hidden flex-shrink-0">
        {chatList || <div className="p-4">Loading chat list...</div>}
      </aside>
      <main className="flex-1 overflow-hidden">
        {chat || (
          <div className="h-full flex items-center justify-center text-center p-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Welcome to Your Messages</h2>
              <p className="text-sm text-muted-foreground">Select a chat to start messaging or create a new one.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
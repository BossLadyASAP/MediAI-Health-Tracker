
import { useState } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { SidebarProvider } from '@/components/ui/sidebar';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  model?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [selectedModel, setSelectedModel] = useState('GPT-4');

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const updateConversation = (conversationId: string, messages: Message[]) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { 
            ...conv, 
            messages, 
            updatedAt: new Date(),
            title: messages.length > 0 && conv.title === 'New Chat' 
              ? messages[0].content.slice(0, 50) + (messages[0].content.length > 50 ? '...' : '')
              : conv.title
          }
        : conv
    ));
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== conversationId);
      if (conversationId === activeConversationId && filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
      }
      return filtered;
    });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-white">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={setActiveConversationId}
          onNewConversation={createNewConversation}
          onDeleteConversation={deleteConversation}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        
        <main className="flex-1 flex flex-col">
          <ChatInterface
            conversation={activeConversation}
            onUpdateConversation={updateConversation}
            selectedModel={selectedModel}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Square, RotateCcw, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Conversation, Message } from '@/pages/Index';
import { MessageBubble } from './MessageBubble';
import { toast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  conversation?: Conversation;
  onUpdateConversation: (conversationId: string, messages: Message[]) => void;
  selectedModel: string;
}

export function ChatInterface({ 
  conversation, 
  onUpdateConversation, 
  selectedModel 
}: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const messages = conversation?.messages || [];

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !conversation || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
      model: selectedModel
    };

    const updatedMessages = [...messages, userMessage];
    onUpdateConversation(conversation.id, updatedMessages);
    
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response to: "${inputMessage}". In a real implementation, this would connect to an AI API like OpenAI's GPT models.`,
        role: 'assistant',
        timestamp: new Date(),
        model: selectedModel
      };

      onUpdateConversation(conversation.id, [...updatedMessages, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `${file.name} is ready to upload`,
      });
    }
  };

  const regenerateLastResponse = () => {
    if (!conversation || messages.length === 0) return;
    
    // Find last user message index using a compatible approach
    let lastUserMessageIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        lastUserMessageIndex = i;
        break;
      }
    }
    
    if (lastUserMessageIndex === -1) return;

    const messagesUpToLastUser = messages.slice(0, lastUserMessageIndex + 1);
    onUpdateConversation(conversation.id, messagesUpToLastUser);
    
    const lastUserMessage = messages[lastUserMessageIndex];
    setInputMessage(lastUserMessage.content);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to ChatGPT Clone</h2>
          <p className="text-gray-600">Select a conversation or start a new one to begin chatting.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            {conversation.title}
          </h1>
          <Badge variant="secondary" className="text-xs">
            {selectedModel}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                How can I help you today?
              </h3>
              <p className="text-gray-600">
                Start a conversation by typing a message below.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={() => {
                  navigator.clipboard.writeText(message.content);
                  toast({
                    title: "Copied to clipboard",
                    description: "Message content copied successfully",
                  });
                }}
              />
            ))
          )}
          
          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-sm">
                AI
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {selectedFile && (
            <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-700">{selectedFile.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedFile(null)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          )}
          
          <div className="relative flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 p-0 hover:bg-gray-100"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message ChatGPT..."
                className="min-h-[50px] max-h-[200px] resize-none pr-12 border-gray-300 focus:border-gray-400"
                disabled={isLoading}
              />
              
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                {messages.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={regenerateLastResponse}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    disabled={isLoading}
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                )}
                
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700"
                >
                  {isLoading ? (
                    <Square className="h-3 w-3" />
                  ) : (
                    <Send className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            ChatGPT can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

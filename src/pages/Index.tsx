import { useEffect, useRef } from "react";
import { Phone, Clock, Users } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-80 bg-secondary text-secondary-foreground flex-col border-r border-border">
        <div className="p-6 border-b border-border/20">
          <h1 className="text-2xl font-bold mb-2">Central de Atendimento</h1>
          <p className="text-sm opacity-90">Banco Itaú</p>
        </div>
        
        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-background/10 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Atendimento Online</p>
                <p className="text-xs opacity-75">Disponível agora</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-background/10 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Horário</p>
                <p className="text-xs opacity-75">24 horas, 7 dias</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-background/10 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Atendentes</p>
                <p className="text-xs opacity-75">Especialistas disponíveis</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border/20">
            <h3 className="font-semibold mb-3 text-sm">Dúvidas Frequentes</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Saldo e extratos</li>
              <li>• Cartões de crédito</li>
              <li>• Empréstimos e financiamentos</li>
              <li>• Investimentos</li>
              <li>• Seguros</li>
              <li>• Abertura de conta</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-border/20">
          <p className="text-xs opacity-75 text-center">
            © 2024 Banco Itaú. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-chat-header-bg text-chat-header-fg p-4 shadow-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Assistente Virtual Itaú</h2>
              <p className="text-sm opacity-90">Estamos aqui para ajudar</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm">Online</span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-muted/30">
          <div className="max-w-4xl mx-auto py-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-chat-ai-bg text-chat-ai-fg border border-border">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-background">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

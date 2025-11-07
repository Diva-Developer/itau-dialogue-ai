import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isUser ? "bg-chat-user-bg text-chat-user-fg" : "bg-chat-ai-bg text-chat-ai-fg border border-border"
        )}
      >
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>
      <div
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[80%] shadow-sm",
          isUser
            ? "bg-chat-user-bg text-chat-user-fg ml-auto"
            : "bg-chat-ai-bg text-chat-ai-fg"
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

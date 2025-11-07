import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Tag } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string, isProductOffer?: boolean) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = (isProductOffer = false) => {
    if (input.trim() && !disabled) {
      onSend(input.trim(), isProductOffer);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(false);
    }
  };

  return (
    <div className="flex gap-2 p-4 bg-background border-t border-border">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua resposta como atendente..."
        disabled={disabled}
        className="min-h-[60px] max-h-[120px] resize-none"
      />
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => handleSend(true)}
          disabled={disabled || !input.trim()}
          size="icon"
          variant="secondary"
          className="h-[60px] w-[60px] shrink-0"
          title="Ofertar Produto"
        >
          <Tag className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => handleSend(false)}
          disabled={disabled || !input.trim()}
          size="icon"
          className="h-[60px] w-[60px] shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;

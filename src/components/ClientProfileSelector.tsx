import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Clock, Shield, Frown, ThumbsUp } from "lucide-react";

interface ClientProfile {
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Fácil" | "Médio" | "Difícil";
}

interface ClientProfileSelectorProps {
  onSelectProfile: (profileIndex?: number) => void;
  isLoading: boolean;
}

const profiles: ClientProfile[] = [
  {
    name: "Cliente Impaciente",
    description: "Cliente com pressa, direto ao ponto e um pouco ríspido. Bom para treinar agilidade.",
    icon: <Clock className="h-5 w-5" />,
    difficulty: "Médio",
  },
  {
    name: "Cliente Confuso",
    description: "Não entende bem de tecnologia, precisa de explicações detalhadas e pacientes.",
    icon: <User className="h-5 w-5" />,
    difficulty: "Fácil",
  },
  {
    name: "Cliente Desconfiado",
    description: "Cético em relação a ofertas, questiona tudo. Excelente para treinar argumentação.",
    icon: <Shield className="h-5 w-5" />,
    difficulty: "Difícil",
  },
  {
    name: "Cliente Insatisfeito",
    description: "Frustrado com problemas anteriores, expressa insatisfação claramente.",
    icon: <Frown className="h-5 w-5" />,
    difficulty: "Difícil",
  },
  {
    name: "Cliente Receptivo",
    description: "Aberto a propostas mas cauteloso, faz perguntas inteligentes.",
    icon: <ThumbsUp className="h-5 w-5" />,
    difficulty: "Médio",
  },
];

const ClientProfileSelector = ({ onSelectProfile, isLoading }: ClientProfileSelectorProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400";
      case "Médio":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400";
      case "Difícil":
        return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Simulador de Treinamento de Atendentes
        </h1>
        <p className="text-muted-foreground text-lg">
          Escolha o perfil do cliente para iniciar o treinamento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => !isLoading && onSelectProfile(index)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {profile.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{profile.name}</CardTitle>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(
                        profile.difficulty
                      )}`}
                    >
                      {profile.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">{profile.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group border-dashed"
          onClick={() => !isLoading && onSelectProfile()}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <User className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Cliente Aleatório</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Deixe o sistema escolher um perfil aleatório para você. Perfeito para treinamento
              variado!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Como funciona o treinamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              1
            </div>
            <p>
              <strong className="text-foreground">O cliente (IA)</strong> inicia a conversa com um
              problema real
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              2
            </div>
            <p>
              <strong className="text-foreground">Você atende</strong> e tenta resolver o problema
              do cliente
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
              3
            </div>
            <p>
              <strong className="text-foreground">Use o botão "Ofertar"</strong> (ícone de tag) para
              fazer uma oferta de produto ao cliente
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
              4
            </div>
            <p>
              <strong className="text-foreground">Treine contra-argumentação:</strong> O cliente
              provavelmente recusará a primeira oferta. Argumente melhor!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Tag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);

export default ClientProfileSelector;

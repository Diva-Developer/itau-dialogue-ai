import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Perfis de clientes para simulação
const clientProfiles = [
  {
    name: "Cliente Impaciente",
    personality: "Você está com pressa e um pouco irritado. Tem um problema urgente com sua conta e quer resolver rápido. É direto e às vezes um pouco ríspido, mas pode ser convencido com bons argumentos.",
    problem: "Sua conta foi debitada indevidamente por uma compra que você não reconhece de R$ 450,00"
  },
  {
    name: "Cliente Confuso",
    personality: "Você é uma pessoa mais velha, não entende muito de tecnologia bancária e precisa de explicações detalhadas e pacientes. É educado mas faz muitas perguntas.",
    problem: "Você não consegue acessar o aplicativo do banco e não sabe como ver seu saldo"
  },
  {
    name: "Cliente Desconfiado",
    personality: "Você é cético em relação a ofertas bancárias e precisa de muita convicção. Questiona tudo e sempre acha que o banco quer te vender algo que não precisa.",
    problem: "Suas taxas de manutenção aumentaram e você quer saber o motivo"
  },
  {
    name: "Cliente Insatisfeito",
    personality: "Você já teve problemas anteriores com o banco e está frustrado. É educado mas firme, e expressa sua insatisfação claramente.",
    problem: "Seu cartão de crédito foi bloqueado sem aviso prévio durante uma viagem"
  },
  {
    name: "Cliente Receptivo",
    personality: "Você é aberto a ouvir propostas mas cauteloso. Faz perguntas inteligentes e pondera bem antes de aceitar ofertas.",
    problem: "Quer aumentar o limite do cartão para uma compra importante"
  }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, clientProfile, isProductOffer } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Seleciona perfil do cliente (usa o enviado ou randomiza)
    const profile = clientProfile !== undefined 
      ? clientProfiles[clientProfile] 
      : clientProfiles[Math.floor(Math.random() * clientProfiles.length)];

    console.log("Using client profile:", profile.name);

    let systemPrompt = `Você é um CLIENTE do Banco Itaú em uma simulação de treinamento de atendentes.

PERFIL DO CLIENTE:
Nome: ${profile.name}
Personalidade: ${profile.personality}
Problema atual: ${profile.problem}

INSTRUÇÕES IMPORTANTES:
1. Você SEMPRE começa a conversa apresentando seu problema de forma natural
2. Mantenha a personalidade consistente durante toda a conversa
3. Responda como um cliente real responderia, com emoções e dúvidas
4. Se o atendente te oferecer um produto, considere sua personalidade:
   - Cliente Impaciente: Geralmente recusa, diz que não tem tempo
   - Cliente Confuso: Faz muitas perguntas sobre o produto antes de decidir
   - Cliente Desconfiado: Questiona as vantagens, pede garantias, geralmente recusa
   - Cliente Insatisfeito: Pode recusar mencionando problemas anteriores
   - Cliente Receptivo: Pode aceitar se bem argumentado, mas negocia condições
5. Use linguagem natural de cliente, não de atendente bancário
6. Nunca quebre o personagem ou mencione que é uma simulação
7. Se recusar uma oferta, dê motivos realistas (custo, desconfiança, não precisa, etc)
8. Às vezes aceite ofertas BEM argumentadas (20% de chance se receptivo, 5% outros perfis)`;

    if (isProductOffer) {
      systemPrompt += `\n\nATENÇÃO: O atendente acabou de te fazer uma OFERTA DE PRODUTO. Reaja de acordo com sua personalidade:
- Se for Desconfiado/Insatisfeito: Provavelmente recuse educadamente ou com ressalvas
- Se for Confuso: Peça mais explicações e detalhes antes de decidir
- Se for Impaciente: Diga que não tem tempo para isso agora
- Se for Receptivo: Mostre interesse mas faça perguntas sobre custo, benefícios e condições
- IMPORTANTE: Em 70% das vezes, recuse a primeira oferta para treinar a contra-argumentação do atendente`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: systemPrompt
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Por favor, tente novamente em alguns instantes." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Serviço temporariamente indisponível. Por favor, entre em contato com o suporte." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao processar sua solicitação." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro desconhecido" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

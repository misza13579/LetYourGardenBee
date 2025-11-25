exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `Jesteś pomocnym asystentem ogrodowym specjalizującym się w roślinach przyjaznych owadom. 
              Odpowiadaj krótko, konkretnie i w języku polskim. 
              Baza roślin: słonecznik, lawenda, róża.
              Baza owadów: pszczoły, motyle.`
            },
            {
              role: "user",
              content: message,
            },
          ],
          model: "meta-llama/Llama-3.1-8B-Instruct:novita",
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HF API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('HF Response:', JSON.stringify(result, null, 2));
    
    let reply = "Przepraszam, nie udało się uzyskać odpowiedzi.";
    
    if (result.choices && result.choices[0] && result.choices[0].message) {
      reply = result.choices[0].message.content;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
    
  } catch (error) {
    console.error('Error:', error);
    
    const fallbackResponses = {
      'słonecznik': '🌻 Słonecznik kwitnie od lipca do września, przyciąga pszczoły i trzmiele. Wysokość 2-3 metry.',
      'lawenda': '💜 Lawenda kwitnie od czerwca do sierpnia, przyciąga pszczoły i motyle. Odporna na suszę.',
      'róża': '🌹 Róża kwitnie od czerwca do września, przyciąga pszczoły. Wymaga regularnej pielęgnacji.',
      'default': '🌿 Witaj! Jestem asystentem ogrodowym. Zapytaj mnie o rośliny przyjazne owadom!'
    };

    const lowerMessage = JSON.parse(event.body).message.toLowerCase();
    let fallbackReply = fallbackResponses.default;

    if (lowerMessage.includes('słonecznik')) fallbackReply = fallbackResponses.słonecznik;
    else if (lowerMessage.includes('lawenda')) fallbackReply = fallbackResponses.lawenda;
    else if (lowerMessage.includes('róż') || lowerMessage.includes('roza')) fallbackReply = fallbackResponses.róża;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        reply: `[AI] ${fallbackReply}` 
      }),
    };
  }
};
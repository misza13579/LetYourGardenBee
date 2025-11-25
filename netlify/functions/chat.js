exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

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

    // Użyj Hugging Face API - DARMOWE!
    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: { 
          Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({ 
          inputs: `Jesteś pomocnym asystentem ogrodowym specjalizującym się w roślinach przyjaznych owadom. Odpowiadaj w języku polskim. Pytanie: ${message}`,
          parameters: {
            max_length: 200,
            temperature: 0.7,
            do_sample: true
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    
    let reply = "Przepraszam, nie udało się uzyskać odpowiedzi. Spróbuj ponownie.";
    
    if (result && result.generated_text) {
      reply = result.generated_text;
    } else if (result && result[0] && result[0].generated_text) {
      reply = result[0].generated_text;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
    
  } catch (error) {
    console.error('Error:', error);
    
    // Fallback - proste odpowiedzi gdy API nie działa
    const fallbackResponses = {
      'słonecznik': 'Słonecznik kwitnie od lipca do września, przyciąga pszczoły i trzmiele. Wysokość: 200-300 cm. Wymaga słonecznego stanowiska.',
      'lawenda': 'Lawenda kwitnie od czerwca do sierpnia, przyciąga pszczoły i motyle. Odporna na suszę, preferuje glebę wapienną.',
      'róża': 'Róża kwitnie od czerwca do września, przyciąga pszczoły. Wymaga żyznej gleby i regularnego nawożenia.',
      'pszczoły': 'Pszczoły przyciągają: lawenda (9/10), słonecznik (8/10), róże (6/10). Potrzebują źródła wody.',
      'motyle': 'Motyle najlepiej przyciąga lawenda (10/10). Preferują płaskie kwiatostany i rośliny żywicielskie.'
    };

    const lowerMessage = JSON.parse(event.body).message.toLowerCase();
    let fallbackReply = "Dziękuję za pytanie! Jestem asystentem ogrodowym. Możesz zapytać o konkretne rośliny lub owady.";

    Object.keys(fallbackResponses).forEach(key => {
      if (lowerMessage.includes(key)) {
        fallbackReply = fallbackResponses[key];
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: fallbackReply }),
    };
  }
};
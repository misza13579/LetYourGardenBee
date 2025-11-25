exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  // Fix CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: { 
          Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({ 
          inputs: message,
          parameters: {
            max_length: 500,
            temperature: 0.7,
            do_sample: true
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HF API error: ${response.status}`);
    }

    const result = await response.json();
    
    let reply = "Przepraszam, nie udało się uzyskać odpowiedzi.";
    
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
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        reply: 'Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.' 
      }),
    };
  }
};
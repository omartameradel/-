export async function handler(event) {
  const body = JSON.parse(event.body);

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: body.prompt,
        size: "512x512"
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.data[0].url })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

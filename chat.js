export async function handler(event) {
  const body = JSON.parse(event.body);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: "أنت مساعد يكتب الأكواد داخل ```language ... ``` فقط." },
          { role: "user", content: body.message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.output[0].content[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

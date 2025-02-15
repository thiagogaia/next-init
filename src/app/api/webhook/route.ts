export async function POST(request: Request) {
  // let text;
  try {
    const text = await request.text();
    // const data = JSON.parse(text);
    // Process the webhook payload

    const response = new Response(
      JSON.stringify({
        message: "Success!",
        data: text,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Processa os dados após enviar a resposta
    processDataAsync(text).catch(error => {
      console.error('Error processing data:', error)
    })
    console.log('📢 [route.ts:25]', response);
    return response
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Webhook error bah: ${error.message}`,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Função que processa os dados de forma assíncrona
async function processDataAsync(text: string) {
  // Aqui você pode fazer operações demoradas como:
  // - Salvar no banco de dados
  // - Enviar emails
  // - Processar arquivos
  // - Fazer chamadas para outras APIs
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(text)
    console.log('processando assincronamente do nada')
    // Exemplo: salvar no banco
    // await saveToDatabase(data)
    // Exemplo: enviar email
    // await sendEmail(data)
  } catch (error) {
    // Loga o erro mas não afeta a resposta original
    console.error('Failed to process data:', error)
  }
}
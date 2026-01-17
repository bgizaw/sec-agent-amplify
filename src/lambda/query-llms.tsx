// Helper function to invoke Lambda using Function URL
async function invokeLambda(
  question: string,
  ticker: string,
  year: string
): Promise<string> {
  const payload = {
    question: question,
    ticker: ticker,
    year: year,
  };

  try {
    const response = await fetch(
      "https://j37psejqbxasouapqpsf5m7vvy0pmtyv.lambda-url.us-east-2.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const result = await response.json();

    // Return the answer from the response
    return result.answer as string;
  } catch (error) {
    console.error("Lambda invocation error:", error);
    throw error;
  }
}

export { invokeLambda };

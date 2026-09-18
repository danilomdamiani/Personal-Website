export default async (request, context) => {
  const accept = request.headers.get("accept") || "";

  // Check if client requests Markdown content negotiation
  if (accept.includes("text/markdown")) {
    const url = new URL(request.url);

    // Intercept root or index.html requests
    if (url.pathname === "/" || url.pathname === "/index.html") {
      try {
        const llmsUrl = new URL("/llms.txt", request.url);
        const markdownResponse = await fetch(llmsUrl.toString());

        if (markdownResponse.ok) {
          const markdownText = await markdownResponse.text();
          // Approximate token count (~4 characters per token)
          const tokenCount = Math.ceil(markdownText.length / 4);

          return new Response(markdownText, {
            status: 200,
            headers: {
              "Content-Type": "text/markdown; charset=utf-8",
              "Vary": "Accept",
              "x-markdown-tokens": tokenCount.toString(),
              "Link": '</llms.txt>; rel="describedby", </.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="service-doc"',
              "Cache-Control": "public, max-age=0, must-revalidate"
            }
          });
        }
      } catch (err) {
        console.error("Error serving markdown negotiation:", err);
      }
    }
  }

  // Fallback to default HTML response
  const response = await context.next();
  response.headers.set("Vary", "Accept");
  return response;
};

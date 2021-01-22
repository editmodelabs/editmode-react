import DOMpurify from "isomorphic-dompurify";

export const sanitizeContent = (data, variables, fallbackChunk) => {
  const sanitizedContent = DOMpurify.sanitize(data.content);
  const parsedChunk = { ...data, content: sanitizedContent };
  const tokens = (parsedChunk.content.match(/\{{(.*?)\}}/g)|| []).map(t => t.substr(2, t.length-4))
  
  let isVariableSafe = true;
  if (tokens) {
    tokens.forEach(function(token) {
      const value = variables && variables[token] || ""
      const emVar = `<em-var data-chunk-variable="${token}" data-chunk-variable-value="${value}">${value}</em-var>`
      parsedChunk.content = parsedChunk.content.replace(`{{${token}}}`, emVar);

      if (!value) isVariableSafe = false;
    });
  }

  if ( !isVariableSafe && fallbackChunk) {
    parsedChunk.content = fallbackChunk.content
  }

  return parsedChunk
}

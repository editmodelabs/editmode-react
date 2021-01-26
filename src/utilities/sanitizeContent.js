import DOMpurify from "isomorphic-dompurify";

export const sanitizeContent = (data, props) => {
  const sanitizedContent = DOMpurify.sanitize(data.content);
  const chunk = { ...data, content: sanitizedContent };
  const tokens = (chunk.content.match(/\{{(.*?)\}}/g)|| []).map(t => t.substr(2, t.length-4))
  
  let parsedChunk = chunk.content;

  if (tokens) {
    tokens.forEach(function(token) {
      const value = props.variables && props.variables[token] || ""
      const emVar = `<em-var data-chunk-variable="${token}" data-chunk-variable-value="${value}">${value}</em-var>`
      parsedChunk = parsedChunk.replace(`{{${token}}}`, emVar);
    });
  }

  return { chunk, parsedChunk }
}

import DOMpurify from "isomorphic-dompurify";

export const sanitizeContent = (data, props) => {
  const sanitizedContent = DOMpurify.sanitize(data.content);
  const chunk = { ...data, content: sanitizedContent };
  const tokens = chunk.content.match(/\{{(.*?)\}}/g);

  let parsedChunk = chunk.content;

  if (tokens) {
    tokens.forEach(function(token) {
      parsedChunk = parsedChunk.replace(token, props.variables[token.substr(2, token.length-4)]);
    });
  }

  return { chunk, parsedChunk }
}
export const setDefaultContent = (content) => {
  let cleanContent = content

  if (Array.isArray(content)) {
    cleanContent = content.join("")
  }

  return cleanContent
}
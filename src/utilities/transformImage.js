export const transformImage = (url, transformation) => {
  transformation = transformation.trim().replace(/\s+/g, ' ').replace(" ", ",")

  try {
    newUrl= new URL(url)
    newUrl.searchParams.append('tr', transformation)
  
    return newUrl.toString()
  } catch (er){
    console.warn(er)
    return url
  }
}
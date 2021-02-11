export const transformImage = (url, transformation) => {
  try {
    transformation = transformation.trim().replace(/\s+/g, ' ').replace(" ", ",")
    let newUrl = new URL(url)
    newUrl.searchParams.append('tr', transformation)
    return newUrl.toString()
  } catch (er){
    console.warn(er)
    return url
  }
}
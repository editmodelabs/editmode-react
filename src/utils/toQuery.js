export const toQuery = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (p.includes("[]") && Array.isArray(obj[p])) {
        obj[p].forEach( v => {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(v));
        })
      } else {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
  return str.join("&");
}
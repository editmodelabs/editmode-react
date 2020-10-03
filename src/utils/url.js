const devMode = window["editmodeENV"] === 'development';
const stagingMode = window["editmodeENV"] === 'staging';

const staticSubdomain = stagingMode ? 'static-staging' : 'static'
const apiSubdomain = stagingMode ? 'api-staging' : 'api'
const domain = devMode ? 'lvh.me:3001' : 'editmode.com'
const subdomain = stagingMode ? 'staging' : 'www'


export const generateUrl = (type) => {
  switch(type) {
    case 'asset':
      return `http://${staticSubdomain}.${domain}`
    case 'api':
      return `http://${apiSubdomain}.${domain}`
    default:
      return `http://${subdomain}.${domain}`
  }
}

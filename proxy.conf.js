const HttpsProxyAgent = require('https-proxy-agent');

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://angular.io/guide/build#using-corporate-proxy
 */
const proxyConfig = [
  {
    context: '/oauth/v2/accessToken',
    target: 'https://www.linkedin.com/',
    changeOrigin: true,
    secure: false
  },
  {
    context: '/v2/me',
    target: 'https://api.linkedin.com/',
    changeOrigin: true,
    secure: false
  },
  {
    context: '/api/*',
    //target: 'https://5aj8ifz600.execute-api.us-east-1.amazonaws.com/Stage/',
     // target:'https://testapi.conconnect.com',
    //target: 'https://lapy9m18hd.execute-api.us-east-1.amazonaws.com/Stage',
    //target:'http://localhost:4200',
    target: this.baseUrl,
    changeOrigin: true,
    secure: false,
  },
];

/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach((entry) => {
      entry.agent = agent;
    });
  }

  return proxyConfig;
}

module.exports = proxyConfig; //setupForCorporateProxy(proxyConfig);

import koa from 'koa'
import serve from 'koa-static-folder';
import React from 'react'
import { renderToString } from 'react-dom/server'
import pkg from '../../package'
import App from '../containers/App'
import qs from 'qs'
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import { fetchCounter } from '../api/counter';

var app = koa();
var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

app.use(serve('./dist'))

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Example Koa + Redux App</title>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/bundle.js"></script>
      </head>
      <body onLoad="window.initApp()">
        <div id="root">${html}</div>
      </body>
    </html>
    `;
}

function* handleRender (req, res) {
  const initialState = { counter: 0 };
  const store = configureStore(initialState);
  const html = renderToString(<Provider store={store}><App/></Provider>);
  const finalState = store.getState();
  this.body = renderFullPage(html, finalState);
  /*
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;

    // Compile an initial state
    const initialState = { counter };

    // Create a new Redux store instance
    const store = configureStore(initialState);

    // Render the component to a string
    const html = renderToString(<Provider store={store}><App/></Provider>);

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    // Send the rendered page back to the client
    this.body = renderFullPage(html, finalState);
  });
  */
}

app.use(handleRender);

app.listen(port, host, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.log(`${pkg.name} is listening on ${host}:${port}. Open up http:` + '//' + `${host}:${port}/ in your browser.`)
  }
})
/*
# TODO: find out if there are koa webpack dev/hot middlewares
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
*/

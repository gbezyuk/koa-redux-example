import koa from 'koa'
var serve = require('koa-static-folder');
import { renderToString } from 'react-dom/server'
import React from 'react'
import pkg from '../package'
import App from './components/App'

var app = koa();
var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

app.use(serve('./dist'))

app.use(function *(){
  this.response.body = '<html><head><title>Example Koa + Redux App</title>' +
    '<script src="/dist/bundle.js"></script>' +
    '</head><body>' + renderToString(<App />) + '</body></html>'
});

app.listen(port, host, () => { console.log(pkg.name + ' is listening on ' + host + ':' + port) } )

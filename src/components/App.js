import React from 'react'
if (process.env.IS_BUNDLING_FOR_BROWSER) {
  require('../stylesheets/app.styl')
}

export default class App extends React.Component {
  render () {
    return <div id="app">
      <h1>Koa-Redux-Example</h1>
    </div>
  }
}

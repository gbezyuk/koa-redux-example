import React from 'react'
if (process.env.IS_BUNDLING_FOR_BROWSER) {
  require('../stylesheets/app.styl')
}
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default class App extends React.Component {
  render () {
    var CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)
    return <div id="app">
      <h1>Koa-Redux-Example</h1>
      <CounterContainer />
    </div>
  }
}

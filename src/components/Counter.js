import React, { Component, PropTypes } from 'react';

class Counter extends Component {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div className="counter">
        <h2>Counter</h2>
        <p>
          Clicked: {counter} times
          {' '}
          <button onClick={increment}>++</button>
          {' '}
          <button onClick={decrement}>--</button>
          {' '}
          <button onClick={incrementIfOdd}>++ if odd</button>
          {' '}
          <button onClick={() => incrementAsync()}>++ async</button>
        </p>
      </div>
    );
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Counter;

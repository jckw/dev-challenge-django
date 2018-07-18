import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/* Proposed tests:
  * Potential connection errors:
    * InputGraphSection is not rendered if the server is not unreachable on render
    * result cannot change is server is unreachable
    * does not crash if server becomes unreachable
  * Changes:
    * changing the savingsAmount changes the result
    * changing the monthlySaving changes the result
    * changing the interestRate changes the result
  * Expected increases:
    * increasing the savingsAmount increases the result
    * increasing the monthlySaving increases the result
    * increasing the interestRate increases the result
  * Feature tests:
    * If savingsAmount and monthlySaving are both set to 0, DisplayGraph is not rendered
    * Error notice (banner) not shown when server is reachable
    * Error notice (banner) shown when server is not reachable
    *
  */

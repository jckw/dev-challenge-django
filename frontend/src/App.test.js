import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';

import App from './App';
import InputGraphSection from "./Components/InputGraphSection";

describe('App in general', () => {
    it('renders without crashing', () => {
        expect(shallow(<App />).find('div.App').exists()).toBe(true)
    });

    it('is loading when rendered', () => {
        expect(shallow(<App />).state().loading).toBe(true)
    });
})

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

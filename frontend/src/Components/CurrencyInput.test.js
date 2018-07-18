import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import TestRenderer from 'react-test-renderer';

import CurrencyInput from "./CurrencyInput";

describe("CurrencyInput", () => {
    it('renders correctly', () => {
        const tree = TestRenderer.create(
            <CurrencyInput value={5} onValueChange={(v) => {}}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
})

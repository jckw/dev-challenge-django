import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import TestRenderer from 'react-test-renderer';

import InterestFreqInput from "./InterestFreqInput";

describe("InterestFreqInput", () => {
    it('renders correctly', () => {
        const tree = TestRenderer.create(
            <InterestFreqInput value="m" onValueChange={(v) => {}}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
})

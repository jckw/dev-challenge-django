import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import TestRenderer from 'react-test-renderer';

import SliderInput from "./SliderInput";

describe("SliderInput", () => {
    it('renders correctly', () => {
        const tree = TestRenderer.create(
            <SliderInput value="m" onValueChange={(v) => {}}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    })
})

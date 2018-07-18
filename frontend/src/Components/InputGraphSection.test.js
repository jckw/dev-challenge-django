import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import TestRenderer from 'react-test-renderer';

import InputGraphSection from "./InputGraphSection";
import DisplayGraph from "./DisplayGraph";

const defaults = {
    savingsAmount: 1000,
    monthlySaving: 50,
    interestRate: 4,
    interestFreq: "m",
    result: 12,
    graph_data: [{month: 0, amount: 12}]
}

describe('InputGraphSection', () => {
    it('renders without error', () => {
        const wrapper = shallow(<InputGraphSection
            defaults={defaults}
            apiCalculate={(a, b, c, d, e) => {
                return {
                    result: defaults.result,
                    graph_data: defaults.graph_data
                }
            }}
            unreachable={false}
            reportReachability={() => {}}/>
        )

        expect(wrapper.exists(<div className="content-wrapper"></div>)).toBe(true)
    })

    it('renders without graph if server unreachable', () => {
        const wrapper = shallow(<InputGraphSection
            defaults={defaults}
            apiCalculate={(a, b, c, d, e) => {
                return {
                    result: defaults.result,
                    graph_data: defaults.graph_data
                }
            }}
            unreachable={true}
            reportReachability={() => {}}/>
        )

        expect(wrapper.contains(<DisplayGraph />)).toBe(false)
    })
})

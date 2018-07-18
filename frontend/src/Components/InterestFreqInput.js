import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './InterestFreqInput.css'

export default class InterestFreqInput extends Component {
    handleChange(e) {
        this.props.onValueChange(e.target.value)
    }

    render() {
        const value = this.props.value

        return (
            <div className="interest-freq">
                <select value={value}
                        onChange={this.handleChange.bind(this)}>
                    <option value="m">Monthly</option>
                    <option value="q">Quarterly</option>
                    <option value="a">Annually</option>
                </select>
            </div>
        )
    }
}

InterestFreqInput.propTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func
}

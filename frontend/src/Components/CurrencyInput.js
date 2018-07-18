import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CurrencyInput.css'

export default class CurrencyInput extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasFocus: false,
		}
	}

	handleChange(e) {
		const value = e.target.value
		this.props.onValueChange(value)
	}

	handleFocus(e) {
		this.setState({
			hasFocus: true
		})
	}

	render() {
		const { value } = this.props

		return (
			<div className={`currency-input ${value !== undefined ? 'default-value' : ''}`}>
				<span>£</span>
				<input type="text"
					value={value}
					onChange={this.handleChange.bind(this)}
					onFocus={this.handleFocus.bind(this)}/>
			</div>
		)
	}
}

CurrencyInput.propTypes = {
	value: PropTypes.number,
    onValueChange: PropTypes.func
}

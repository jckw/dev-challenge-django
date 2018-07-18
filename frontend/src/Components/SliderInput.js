import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './SliderInput.css'

export default class SliderInput extends Component {
    handleChange(e) {
        const value = e.target.value
        this.props.onValueChange(Number(value))
    }

    render() {
        const {value} = this.props

        return (
            <div className="fmz-slider">
                <p>{value}%</p>
                <input type="range"
                       value={value}
                       min={0}
                       max={10}
                       step={0.25}
                       onChange={this.handleChange.bind(this)}/>
            </div>
        )
    }
}

SliderInput.propTypes = {
    value: PropTypes.number,
    onValueChange: PropTypes.func
}

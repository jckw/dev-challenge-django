import React, {Component} from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import DisplayGraph from "./DisplayGraph"
import InterestFreqInput from "./InterestFreqInput"
import "./InputGraphSection.css"

export default class InputGraphSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            savingsAmount: this.props.defaults.savingsAmount,
            monthlySaving: this.props.defaults.monthlySaving,
            interestRate: this.props.defaults.interestRate,
            interestFreq: this.props.defaults.interestFreq,
            result: this.props.defaults.result,
            graph_data: this.props.defaults.graph_data,
            latest: true
        }

        this.handleAnyChange = this.handleAnyChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (!this.state.latest && this.props.unreachable !== prevProps.unreachable) {
            console.log("Change!")
            this.handleAnyChange()
        }
    }

    handleErrors() {
        this.props.reportReachability()

        this.setState({
            latest: false,
            result: null,
            graph_data: null
        })
    }

    isValid(n) {
        return !isNaN(Number(n))
    }

    handleAnyChange() {
        return this.props.apiCalculate(this.state)
            .then(r => {
                if (r === undefined) this.handleErrors()
                else {
                    this.props.reportReachability(true)
                    this.setState({
                        latest: true,
                        result: r.result,
                        graph_data: r.graph_data
                    })
                }
            })
    }

    handleAmountChange(amount) {
        if (this.isValid(amount)) {
            this.setState({savingsAmount: Number(amount)}, this.handleAnyChange)
        }
    }

    handleMonthlyChange(saving) {
        if (this.isValid(saving)) {
            this.setState({monthlySaving: Number(saving)}, this.handleAnyChange)
        }
    }

    handleRateChange(rate) {
        if (this.isValid(rate)) {
            this.setState({interestRate: Number(rate)}, this.handleAnyChange)
        }
    }

    handleFreqChange(freq) {
        this.setState({interestFreq: freq}, this.handleAnyChange)
    }

    render() {

        return (
            <div className="content-wrapper">
                <div className="financial-inputs">
                    <p className="input-label">How much have you saved?</p>
                    <CurrencyInput
                        value={this.state.savingsAmount}
                        onValueChange={this.handleAmountChange.bind(this)}/>

                    <p className="input-label">How much will you save each month?</p>
                    <CurrencyInput
                        value={this.state.monthlySaving}
                        onValueChange={this.handleMonthlyChange.bind(this)}/>

                    <p className="input-label">
                        How much interest will you earn per year?
                    </p>
                    <SliderInput
                        value={this.state.interestRate}
                        onValueChange={this.handleRateChange.bind(this)}/>

                    <p className="input-label">
                        How often is interest paid?
                    </p>
                    <InterestFreqInput
                        value={this.state.interestFreq}
                        onValueChange={this.handleFreqChange.bind(this)}/>
                </div>
                <div className="financial-result">
                    <p><span role="img" aria-label="drumroll">🥁</span> You'll have...</p>
                    <h3>£{this.state.result}</h3>
                    <p>after 50 years</p>
                </div>
                <div className="financial-display">
                    {this.props.unreachable ? null :
                        <DisplayGraph data={this.state.graph_data}
                                      isEmpty={this.state.monthlySaving == 0 && this.state.savingsAmount == 0}/>}
                </div>
            </div>
        )
    }
}

import React, {Component} from "react"
import {calculate} from "./API"
import InputGraphSection from './Components/InputGraphSection'
import "./App.css"

class App extends Component {
    state = {
        loading: true,
        unreachable: false,
        defaults: {
            savingsAmount: 1000,
            monthlySaving: 50,
            interestRate: 4,
            interestFreq: "m",
            result: null,
            graph_data: null
        }
    }

    apiCalculate(state) {
        const r = calculate(
            state.savingsAmount,
            state.monthlySaving,
            state.interestRate,
            state.interestFreq
        )

        if (r === undefined) this.reportReachability(false)

        return r
    }

    componentDidMount() {
        this.attemptRender.bind(this)()
    }

    attemptRender() {
        this.apiCalculate.bind(this)(this.state.defaults)
            .then(r => {
                if (r === undefined) {
                    this.reportReachability(false)
                } else {
                    this.setState({unreachable: false})

                    if (this.state.loading) {
                        this.setState(prevState => ({
                            loading: false,
                            defaults: {
                                ...prevState.defaults,
                                result: r.result,
                                graph_data: r.graph_data
                            }
                        }))
                    }
                }
            })
    }

    reportReachability(reachable) {
        this.setState({unreachable: !reachable})
    }

    render() {
        const {loading, unreachable} = this.state
        let warning;

        if (unreachable) {
            warning = (
                <div className="unreachable">
                    We're having some trouble connecting to our servers.
                    <button onClick={this.attemptRender.bind(this)}>Retry connecting?</button>
                </div>
            )
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Finimize dev challenge 💸</h1>
                </header>
                {loading ?
                    <p className="loading">Loading...</p>
                    : <InputGraphSection
                        defaults={this.state.defaults}
                        apiCalculate={this.apiCalculate.bind(this)}
                        unreachable={unreachable}
                        reportReachability={this.reportReachability.bind(this)}/>
                }
                {warning}
            </div>
        )
    }
}

export default App

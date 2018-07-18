import axios from "axios";

export const calculate = (savingsAmount, monthlySaving, interestRate, interestFreq) => {
	return axios.get("/calculate/", {
            params: {
                savingsAmount,
                monthlySaving,
                interestRate,
                interestFreq
            }
        })
		.then(r => {
			const result = r.data.result
			const graph_data = r.data.graph_data

			if (r.status != 200) {
				throw `${r.status} error: ${r.statusText}`
			}

			if(result === undefined || graph_data === undefined){
			    throw "Invalid data received"
			}

            return {result, graph_data}
        })
		.catch(error => {
			console.log(error)
		})
}

from typing import Dict, List, Union
from rest_framework import serializers

INTEREST_FREQ = {"m": 1, "q": 3, "a": 12}


def calc_interest(amount: float, rate: float, interval: int) -> float:
    return amount * effective_rate_percent(rate, interval)


def effective_rate_percent(rate: float, interval: int) -> float:
    periods = 12//interval
    return (1 + rate/100) ** (1/periods) - 1


def fmt_datum(month: int, amount: float) -> Dict[str, Union[int, float]]:
    return {
        "month": month,
        "amount": amount
    }


def calculate_data(savings_amount: float, monthly_saving: float, interest_rate: float,
                 interest_freq: str, months: int) -> (Dict[str, Union[int, float]], float):
    amount = savings_amount
    interval = INTEREST_FREQ[interest_freq]

    graph_data = [fmt_datum(month=0, amount=amount)]

    for i in range(1, months + 1):
        amount += monthly_saving

        # Apply interest, if due
        if i % interval == 0:
            amount += calc_interest(amount, interest_rate, interval)

        amount = round(amount, 2)  # assuming banks round up OR down to 2 dp

        graph_data += [fmt_datum(month=i, amount=amount)]

    return graph_data, graph_data[-1]["amount"]


class CalculateSerializer(serializers.Serializer):
    savingsAmount = serializers.DecimalField(max_digits=None, decimal_places=2)
    monthlySaving = serializers.DecimalField(max_digits=None,decimal_places=2)
    interestRate = serializers.DecimalField(max_digits=None, decimal_places=2)
    interestFreq = serializers.CharField(max_length=None)

    def validate_interestFreq(self, value):
        if value not in INTEREST_FREQ:
            raise serializers.ValidationError("Invalid interest frequency supplied")

        return value

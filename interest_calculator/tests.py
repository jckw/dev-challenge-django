from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework import status

from .views import CalculateView
from .serializers import calculate_data

factory = APIRequestFactory()

class ResponseTest(TestCase):
    def test_sending_invalid_types_produces_400(self):
        request = factory.get('/calculate/', data={
            'savingsAmount': "some money",
            'monthlySaving': False,
            'interestRate': {'test': 0},
            'interestFreq': "lots"
        })

        response = CalculateView.as_view()(request)

        self.assertEqual(response.status_code, 400)

    def test_sending_invalid_savingsAmount_type_produces_400(self):
        request = factory.get('/calculate/', data={
            'savingsAmount': "loadsa' money",
            'monthlySaving': 10,
            'interestRate': 8.25,
            'interestFreq': "m"
        })

        response = CalculateView.as_view()(request)

        self.assertEqual(response.status_code, 400)

    def test_sending_invalid_monthlySaving_type_produces_400(self):
        request = factory.get('/calculate/', data={
            'savingsAmount': 500,
            'monthlySaving': ['not right'],
            'interestRate': 8.25,
            'interestFreq': "m"
        })

        response = CalculateView.as_view()(request)

        self.assertEqual(response.status_code, 400)

    def test_sending_invalid_interestRate_type_produces_400(self):
        request = factory.get('/calculate/', data={
            'savingsAmount': 500,
            'monthlySaving': 40,
            'interestRate': ('x', 'y'),
            'interestFreq': "m"
        })

        response = CalculateView.as_view()(request)

        self.assertEqual(response.status_code, 400)

    def test_sending_invalid_interestFreq_type_produces_400(self):
        request = factory.get('/calculate/', data={
            'savingsAmount': 500,
            'monthlySaving': 40,
            'interestRate': 2.25,
            'interestFreq': 0
        })

        response = CalculateView.as_view()(request)

        self.assertEqual(response.status_code, 400)

    def test_sending_invalid_interestFreq_data_produces_400(self):
        request = factory.get('/calculate/', data={
            'savingsAmount': 500,
            'monthlySaving': 40,
            'interestRate': 2.25,
            'interestFreq': "X"
        })

        response = CalculateView.as_view()(request)

        self.assertEqual(response.status_code, 400)

    def test_using_incorrect_method_produces_405(self):
        request = factory.post('/calculate/')

        response = CalculateView.as_view()(request)

        self.assertEqual(response.status_code, 405)

    def test_valid_data_matches_calculate_data(self):
        data = {
            'savingsAmount': 500,
            'monthlySaving': 40,
            'interestRate': 2.25,
            'interestFreq': "m"
        }

        request = factory.get('/calculate/', data=data)

        response = CalculateView.as_view()(request)
        exp_graph_data, exp_result = calculate_data(**data, months=50 * 12)

        j_resp = response.data

        self.assertEqual(j_resp["result"], exp_result)
        self.assertEqual(j_resp["graph_data"], exp_graph_data)


# Further proposed tests:
# * Calculation tests (probably best done with a property testing lib):
#   * result accuracy
#   * effective_rate accuracy (property test)

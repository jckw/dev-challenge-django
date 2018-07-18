from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import calculate_data, CalculateSerializer


# Note about choosing GET:
# As this endpoint does not update any data on the server, and we are GETting information from the server, we ought to
# use GET as out method.
class CalculateView(APIView):
    def get(self, request, format=None):
        serializer = CalculateSerializer(data=request.GET)

        if serializer.is_valid():
            years = 50
            graph_data, result = calculate_data(
                float(serializer.validated_data["savingsAmount"]),
                float(serializer.validated_data["monthlySaving"]),
                float(serializer.validated_data["interestRate"]),
                serializer.validated_data["interestFreq"],
                years * 12)

            return Response({'result': result, 'graph_data': graph_data})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

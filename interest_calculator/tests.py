# Proposed tests:
# * Calculation tests:
#   * result accuracy
#   * effective_rate accuracy (property test)
# * Django REST Framework tests
#   * sending invalid data produces 500 error
#     * testing each field too
#   * sending correct data matches calculate_data output for suggested input
#     * testing each field too
#   * using incorrect method produces 405 error

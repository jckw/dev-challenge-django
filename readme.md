# Finimize dev challenge

## Development
1. Implemented a `select` component to choose how frequently interest is paid. State was stored at the component's level, the same as was initially done in for CurrentInput etc. Also added a space for `result` to be shown.
2. Lifted the state to the `InputGraphSection` level, so that data can be sent to the API in the future, and that data from each component remains in sync. This was done by providing callback methods that each input component uses in their handleChange functions (or similar).
3. Changed the `API.js` function `calculate` to require parameters for the frequency that interest is paid, and the amount saved each month. Modified the Django backend to prepare for this (still using a simple POST view). Removed the API call and state change in `App.componentDidMount`.
4. Wrote the `calculate_data` function to produce a `Dict` of the response data for valid inputs. Added basic `if ... then` verification that the data was available (and valid, in the case of the frequency of interest payments, using `if x in y then` style checking. Started planning tests.
5. Wrote `effective_rate` to calculate the interest rate per month or quarter if specified.
6. Defined `defaultValues` at the App level, and new function to interact with the API called `apiCalculate`. Both are passed down to the `inputGraphSection` component so that data changes at that level can result in API calls.
7. Implemented `handleAnyChange` at the `InputGraphSection` level, to update the result via an API call.
8. Added `graph_data` to defaults. Added an initial API call and updated defaults based on that so that UI is filled out on load. Passed graph data to `DisplayGraph`.
9. Switched from basic Django to Django REST Framework. Implemented serializer to perform data validation nicely. Change view to APIView, and used GET instead of POST (explanation in file). Changed API.js to match this, including basic error checking which can be seen in it.
10. Planned more tests for frontend.
11. Added a few stylistic changes, and some emojis as necessary.
12. Implemented tests in React using Enzyme and Jest for the first time. Mainly snapshot tests of inputs, with some more specific render-related tests. Added Django API tests as previously specified. Property tests weren't implemented, but would be a good idea to have if this were a real product.

## The challenge

Create a web-app that shows how much you can expect to make from your savings
over time.

The app must satisfy the following Acceptance Criteria (ACs):

* It should allow the user to vary the initial savings amount, monthly deposit and interest rate through the UI
* It should display how much the user's initial savings amount will be worth
  over the next 50 years, to a monthly precision. This should assume that the monthly amount is paid in each month, and the value rises with the interest rate supplied.
* It should allow the user to select how often interest is paid - either 'Monthly', 'Quarterly' or 'Annually'
* All calculations must take place server-side, and all monthly projection data should be returned via an endpoint
* The calculations must be triggered onChange of any input, to give live feedback on the input data. The performance (try the slider) should be reasonable.
* You can use any tech stack on the client you like to manage app state and server communication (e.g. Redux with Thunk/Saga/other API client, Relay/Apollo/GraphQL etc.)

### Our Guidance

The challenge should not take any more than 2-4 hours. You do not need to complete the challenge in one go.

We are keen to see how much you think is enough, and how much would go into a Minimum Viable Product. As a guide, elegant and simple wins over feature rich every time.

Do you test drive your code? This is something we value - any indicator of BDD/TDD would make us smile.

Although the API might be returning relatively straightforward content, please try and write the API code as if you were building something more complex. We would like to gain an idea of how you would go about structuring API code.

Feel free to make any changes to the UI you see fit, although please don't prioritise styling! Something basic will do just fine.

When you are finished, you should send us a link to the codebase, preferably via git (e.g. github) showing multiple commits, so we can see its evolution.

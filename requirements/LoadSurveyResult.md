# Survey Result

> ## Success case ✔️

1. ✔️ Receives a **GET** type request on the route **/api/surveys/{survey_id}/results**
2. ✔️ Validates if the request was made by a user
3. ✔️ Returns **200** with the pool result data

> ## Exceptions ⛔

1. ✔️ Returns error **404** if the API doesn'n exist
2. ✔️ Returns error **403** if you are not a user
3. ✔️ Returns error **500** if I get an error when trying list the survey result

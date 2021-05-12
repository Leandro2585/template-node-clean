# Create Survey

> ## Sucess case ✔️

1. ✔️ Receives a **POST** type request on the route **/api/surveys**
2. ✔️ Valid if the request was made by an **admin**
3. ✔️ Valid mandatory data **question** and **answers**
4. ✔️ Create a **survey** with the data provided
5. ✔️ Returns **204**, no data

> ## Exceptions ⛔

1. ✔️ Returns error **404** if the API doesn'n exist
2. ✔️ Returns error **403** if the user is not **admin**
3. ✔️ Returns error **400** if **question** or **answers** they are not provided by the client
4. ✔️ Returns error **500** if I get an error when trying to create a **survey**
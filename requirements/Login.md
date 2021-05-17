# Login

> ## Success case ✔️
1. ✔️ Receives a **POST** type request on the route **/api/login**
2. ✔️ Valid mandatory data **email** and **password**
3. ✔️ Validates that the **email** field is valid e-mail
4. ✔️ Search for the user with the **email** and **password** provided
5. ✔️ Generates a access token form user **ID**
6. ✔️ Updates user data with generated **access token**
7. ✔️ Returns **200** with **access token** and **name** of user

> ## Exceptions ⛔
1. ✔️ Returns error **404** if the API doesn'n exist
2. ✔️ Returns error **400** if email or password they are not provided by the client
3. ✔️ Returns error **400** if the **email** field is invalid e-mail
4. ✔️ Returns error **401** if not finding a user with the data provided
5. ✔️ Returns error **500** if you get an error when trying generate an access token
6. ✔️ Returns error **500** if you get an error when trying update the user with **access token** generated
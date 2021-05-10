# Sign Up

> ## Success caif

1. Receives a **POST** type request on the route **/api/signup**
2. Valid mandatory data **name**, **email**, **password** and **confirmPassword**
3. Validates that **password** and **confirmPassword** are the same
4. Validates that the **email** field is valid e-mail
5. Valid if a user already exists with the **email** provided
6. Generates an encrypted **password** (this **password** cannot be decrypted)
7. Create a user account with the data provided, replacing the **password** with the encrypted **password**
8. Generates a access token form user **ID**
9. Updates user data with generated **access token**
10. Returns **200** with user access token and **name**

> ## Exceptions

1. Returns error **404** if the API doesn'n exist
2. Returns error **400** if **name**, **email**, **password** or **confirmPassword** they are not provided by the client
3. Returns error **400** if **password** and **confirmPassword** are the same
4. Returns error **400** if the **email** field is invalid e-mail
5. Returns error **403** if the **email** provided is already in use
6. Returns error **500** if you get an error when trying to generate an encrypted password
7. Returns error **500** if you get an error when trying create a user account
8. Returns error **500** if you get an error when trying generate an access token
9. Returns error **500** if you get an error when trying update user with access token generated
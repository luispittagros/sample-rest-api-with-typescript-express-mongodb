# Book Library API

This is a sample API for a book library.

### Setup

Development environment: Node v17.6.0 (lower versions can be used)

```bash
npm install
npm run dev
```

Configuration settings are in the environment variables file `.env`.


#### Users Endpoints

`GET /users`

`GET /users/:id`

`PATCH /users/:id`

`DELETE /users/:id`

### Books Endpoints:

`GET /books`

`GET /books/:id`

`POST /books`

`PATCH /books/:id`

`DELETE /books/:id`

##### Borrow and return Books (requires authentication):

`POST /books/:id/borrow`   (borrow a book)

`POST /books/:id/return `  (return a book)

Requests must be authenticated with a valid user token sent in the header.

Authentication is done via the `Authorization` header:
```
Authorization: Bearer <user_token>
```

To get a user token, you can use the `/auth/login` endpoint.

Before you can use the API, you need to create a user.

Sign Up/Create user:

```
POST /auth/signup
{
    "name": "John Doe",
    "email": "email@test.com",
    "password": "123456"
}
```

Login and get a user token:

```
POST /auth/login
{
    "email": "email@test.com",
    "password": "123456",
}
```

Activate the user account:

```
POST /auth/activate/:code
```

Activation code is sent to the user email address or can be seen in the users list endpoint which is not protected by authentication.

After activation, you can login and get a user token and use it to borrow and return books.

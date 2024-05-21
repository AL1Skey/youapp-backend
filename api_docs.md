Base URL

The base URL for all API endpoints is:

```bash

http://localhost:3000/api
```
Authentication Endpoints

# Register

Endpoint: /auth/register

Method: POST

Description: Register a new user.

Request Body:

```json

{
  "email": "user@example.com",
  "password": "password",
  "name": "John Doe"
}
```

Response:

```json

{
  "access_token": "your_jwt_token"
}
```

# Login

Endpoint: /auth/login

Method: POST

Description: Login an existing user.

Request Body:

```json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json

{
  "access_token": "your_jwt_token"
}
```

# User Profile Endpoints
## Get Profile

Endpoint: /users/:id

Method: GET

Description: Retrieve the profile of a user by ID.

Parameters:

    id: User ID (string)

Headers:

```json

{
  "Authorization": "Bearer your_jwt_token"
}
```

Response:

```json

{
  "email": "user@example.com",
  "name": "John Doe",
  "horoscope": "Leo",
  "zodiac": "Dragon"
}
```

## Update Profile

Endpoint: /users/:id

Method: PUT

Description: Update the profile of a user by ID.

Parameters:

    id: User ID (string)

Headers:

```json

{
  "Authorization": "Bearer your_jwt_token"
}
```

Request Body:

```json

{
  "name": "John Doe",
  "horoscope": "Leo",
  "zodiac": "Dragon"
}
```

Response:

```json

{
  "email": "user@example.com",
  "name": "John Doe",
  "horoscope": "Leo",
  "zodiac": "Dragon"
}
```

# Chat Endpoints
## Send Message

Endpoint: /chat/send

Method: POST

Description: Send a chat message from one user to another.

Headers:

```json

{
  "Authorization": "Bearer your_jwt_token"
}
```

Request Body:

```json

{
  "senderId": "userA_id",
  "receiverId": "userB_id",
  "message": "Hello, how are you?"
}
```

Response:

```json

{
  "senderId": "userA_id",
  "receiverId": "userB_id",
  "message": "Hello, how are you?",
  "timestamp": "2024-05-19T12:34:56.789Z"
}
```

## View Messages

Endpoint: /chat/messages/:userId

Method: GET

Description: Retrieve chat messages for a user.

Parameters:

    userId: User ID (string)

Headers:

```json

{
  "Authorization": "Bearer your_jwt_token"
}
```

Response:

```json

[
  {
    "senderId": "userA_id",
    "receiverId": "userB_id",
    "message": "Hello, how are you?",
    "timestamp": "2024-05-19T12:34:56.789Z"
  }
  ,
  {
    "senderId": "userB_id",
    "receiverId": "userA_id",
    "message": "I'm good, thanks!",
    "timestamp": "2024-05-19T12:35:56.789Z"
  }
]
```
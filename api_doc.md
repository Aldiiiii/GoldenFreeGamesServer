## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`

Routes below need authentication:

- `GET /`
- `POST /collections`
- `GET /collections`
- `PATCH /collections`
- `GET /collections/:id`

### 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email/password is required"
},
{
  "message": "Email/password is invalid"
}
```

&nbsp;

## 3. GET /

Description:

- Fetch all games from FreeToGames API

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
   {
            "id": 540,
            "title": "Overwatch 2",
            "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
            "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
            "game_url": "https://www.freetogame.com/open/overwatch-2",
            "genre": "Shooter",
            "platform": "PC (Windows)",
            "publisher": "Activision Blizzard",
            "developer": "Blizzard Entertainment",
            "release_date": "2022-10-04",
            "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
        },
        {
            "id": 521,
            "title": "Diablo Immortal",
            "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
            "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
            "game_url": "https://www.freetogame.com/open/diablo-immortal",
            "genre": "MMOARPG",
            "platform": "PC (Windows)",
            "publisher": "Blizzard Entertainment",
            "developer": "Blizzard Entertainment",
            "release_date": "2022-06-02",
            "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
        }    
  ...,
]
```

&nbsp;

## 4. POST /collections

Description:
- Add new collections game

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (201 - Created)_
```json
{
            "id": 1,
            "UserId" : 1,
            "GamesId": 540,
            "title": "Overwatch 2",
            "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
            "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
            "game_url": "https://www.freetogame.com/open/overwatch-2",
            "genre": "Shooter",
            "platform": "PC (Windows)",
            "publisher": "Activision Blizzard",
            "developer": "Blizzard Entertainment",
            "release_date": "2022-10-04",
            "freetogame_profile_url": "https://www.freetogame.com/overwatch-2",
            "status": "-"
        }
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. GET /collections

Description:
- Get current user collections games

Request:

- headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
  {
            "id": 1,
            "UserId" : 1,
            "GamesId": 540,
            "title": "Overwatch 2",
            "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
            "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
            "game_url": "https://www.freetogame.com/open/overwatch-2",
            "genre": "Shooter",
            "platform": "PC (Windows)",
            "publisher": "Activision Blizzard",
            "developer": "Blizzard Entertainment",
            "release_date": "2022-10-04",
            "freetogame_profile_url": "https://www.freetogame.com/overwatch-2",
            "status": "-"
        },
        {
            "id": 2,
            "UserId":1,
            "GamesId": 521,
            "title": "Diablo Immortal",
            "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
            "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
            "game_url": "https://www.freetogame.com/open/diablo-immortal",
            "genre": "MMOARPG",
            "platform": "PC (Windows)",
            "publisher": "Blizzard Entertainment",
            "developer": "Blizzard Entertainment",
            "release_date": "2022-06-02",
            "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
        }
  ...,
]
```

&nbsp;

## 6. PATCH /collections/

Description:
- Update status game

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- body:
```json
{
  "status": "string",
  "GamesId": "integer"
}
```

_Response (200 - OK)_
```json

```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

&nbsp;

## 7. GET /collections/:id

Description:
- Displat detail game

Request:

- headers: 
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
{
    "id": 452,
    "title": "Call Of Duty: Warzone",
    "thumbnail": "https://www.freetogame.com/g/452/thumbnail.jpg",
    "status": "Live",
    "short_description": "A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.",
    "description": "Call of Duty: Warzone is both a standalone ...",
    "game_url": "https://www.freetogame.com/open/call-of-duty-warzone",
    "genre": "Shooter",
    "platform": "Windows",
    "publisher": "Activision",
    "developer": "Infinity Ward",
    "release_date": "2020-03-10",
    "freetogame_profile_url": "https://www.freetogame.com/call-of-duty-warzone",
    "minimum_system_requirements": {
        "os": "Windows 7 64-Bit (SP1) or Windows 10 64-Bit",
        "processor": "Intel Core i3-4340 or AMD FX-6300",
        "memory": "8GB RAM",
        "graphics": "NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950",
        "storage": "175GB HD space"
    },
    "screenshots": [
        {
            "id": 1124,
            "image": "https://www.freetogame.com/g/452/Call-of-Duty-Warzone-1.jpg"
        },
        {
            "id": 1125,
            "image": "https://www.freetogame.com/g/452/Call-of-Duty-Warzone-2.jpg"
        },
        {
            "id": 1126,
            "image": "https://www.freetogame.com/g/452/Call-of-Duty-Warzone-3.jpg"
        },
        {
            "id": 1127,
            "image": "https://www.freetogame.com/g/452/Call-of-Duty-Warzone-4.jpg"
        }
    ]
}
```

&nbsp;


## Global Error

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
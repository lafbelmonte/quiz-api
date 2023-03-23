# Quiz API

The API runs on Node.js and is fully written in TypeScript.

It utilizes PostgreSQL for fetching and storing of data, which is being ran in docker. (see `docker-compose.yml`)

It follows the [Route-Controller-Service structure for ExpressJS](https://devtut.github.io/nodejs/route-controller-service-structure-for-expressjs.html).

Node version used: v16.19.0.

# Run API

## Setup Database

    docker compose up -d
    
## Install Dependencies

    npm install

## Create Schema

    npx prisma migrate dev --name init
    
## Build API

    npm run build

## Start API (make sure to build first)
    
    npm start

# API

The API endpoints' request and response are described below.

## Create Quiz

### Request E.g.

`POST /api/quizzes`

    {
        "title": "Final Quiz",
        "description": "Final quiz before prelims.",
        "status": "PUBLISHED",
        "questions": [
            {
                "description": "What does the fox say?",
                "mandatory": true,
                "choices": [
                    {
                        "description": "Sheesh",
                        "correct": true
                    },
                    {
                        "description": "Meow",
                        "correct": false
                    }
                ]
            }
        ]
    }

### Response E.g.

    201

    {
       "success": true,
       "errors": [],
       "data": null
    }

## Read Quizzes

### Request E.g.

`GET /api/quizzes`

### Response E.g.

    200

    {
        "success": true,
        "errors": [],
        "data": [
            {
                "id": "edea2869-2705-4813-bbfa-51213dccddda",
                "title": "Final Quiz",
                "description": "Final quiz before prelims.",
                "status": "PUBLISHED"
            },
            {
                "id": "22260ad0-b4ea-4607-80f7-ada3e7317c67",
                "title": "Surprise Quiz",
                "description": "Surprise quiz for students.",
                "status": "DRAFT"
            }
        ]
    }

### Request E.g.

`GET /api/quizzes/id`

### Response E.g.

    200

    {
        "success": true,
        "errors": [],
        "data": {
            "id": "edea2869-2705-4813-bbfa-51213dccddda",
            "title": "Final Quiz",
            "description": "Final quiz before prelims.",
            "status": "PUBLISHED",
            "questions": [
                {
                    "id": "0c90404b-4d7c-454e-bdce-199a21bd6ac3",
                    "description": "What does the fox say?",
                    "mandatory": true,
                    "quizId": "edea2869-2705-4813-bbfa-51213dccddda",
                    "choices": [
                        {
                            "id": "0a54a1c0-e153-4d1c-b6cf-ffc742988ef5",
                            "description": "Sheesh",
                            "correct": true,
                            "questionId": "0c90404b-4d7c-454e-bdce-199a21bd6ac3"
                        },
                        {
                            "id": "b237e388-35f5-4cd3-920b-5f2090e80bb4",
                            "description": "Meow",
                            "correct": false,
                            "questionId": "0c90404b-4d7c-454e-bdce-199a21bd6ac3"
                        }
                    ]
                }
            ]
        }
    }











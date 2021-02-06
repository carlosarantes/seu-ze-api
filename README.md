# Loja do Seu Zé's API

## Overview 
This API was build to help "Seu Zé" with his grocery store, he needs a API which has REST Http endpoints to manage products and orders and some rabbitmq consumers to increase or decrease the quantity of the products.

## Technologies
This API was build with.
- Node
- Express
- Typescript
- MongoDB
- RabbitMQ

## Running application without Docker
If you want to run the application without docker, you can do it just running the following commands in your projects root:
- `npm run build` and then `npm run start`.
- or you can run with `npm run dev`.
> **NOTE**: Running without docker, you must up the necessaries services by yourself (**MongoDB** and **RabbitMQ**). You will also need to create and **.env** file with all environment variables needed. (Check environment variables section)

## Running application with Docker
To run this application with Docker you just need to run the following command on your terminal inside your project's root: `docker-compose up --build`, you must ensure that ports `3334`, `27017`, `5672` and `15672` are available, because docker will these ports to up the application and its services (MongoDB and RabbitMQ).

## Authentication
To ensure that we'll not have issues regarding security, you will need to authenticate to use the application. 

`POST - /api/v1/users/register` = Register a new user.\
`Payload: { "name" : "Bryan", "email" : "bryan@watson.com", "password" : "10203040" }`

-----------------------------------

`POST - /api/v1/users/login` = Login.\
`Payload: { "email" : "bryan@watson.com", "password" : "10203040" }`

Both these two endpoints if successfully executed, will give you and "token", take this token and use as bearer token authentication, to do that, you just need to add a header called `Authorization` in the requests with "Bearer + TOKEN CONTENT" content.


## Ports
| Port number        | Description           |
| ------------- |:-------------:|
| 3334 | Port which xpress server will listen to |
| 27017 | MongoDB port | 
| 5672 | RabbitMQ client port |
| 15672 | RabbitMQ admin port |

## Environment Variables
| Variable name        | Description           |
| ------------- |:-------------:|
| APP_NAME | Application's name |
| PORT | Port which express server will listen to      | 
| MONGO_URI | Mongo connection URL      |
| RABBITMQ_URI | RabbitMQ connection URL      |

## MongoDB
In this API, MongoDB requires no authentication.

## RabbitMQ

Username: guest\
Password: guest


 ### Archtecture

**exchange**: stock\
**bindings**: incremented ---> **queue**: increment\
**bindings**: decremented ---> **queue**: decrement

**queue**: errors

----------------------
stock -------> incremented | increment (queue) |\
 &nbsp;&nbsp;&nbsp;&nbsp; |-----------> decremented | decrement (queue) |\

 > When a consumer get a error during consuming a message from a queue, the payload content will be sent to **errors** queue.
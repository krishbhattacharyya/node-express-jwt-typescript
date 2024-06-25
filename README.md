# node-express-jwt-typescript

Install
npm install -g ts-node required for nodemon typescript

security
https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html

.env
JWT_SECRET_CODE_ACCESS_TOKEN = 'XXXX'
JWT_SECRET_CODE_REFRESH_TOKEN = 'XXXX'

login: http://localhost:3000/auth/login
post body:
{
"email":"aa@gmail.com",
"password": "test123"
}
return:
{
"accessToken": "XXX,
"refreshToken": "XXX",
"user": {
"email": "aa@gmail.com",// or name if available
"userId": 1
}
}

refresh token: http://localhost:3000/auth/refreshtoken
post body:
{
"token":"XXX" // send refresh token
}
return:
{
"accessToken": "XXXX" // received new access token
}

products: http://localhost:3000/product/getallproducts
get header :{
Authorization: Bearar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5Mjk0MTk5LCJleHAiOjE3MTkyOTQyMjl9.XIn4ejz7XqCtmBZOb3065CuCD-6rDX-Qq7S1e7FvrhI
}
return:
{
"error": "Unauthorized" // or [product]
}

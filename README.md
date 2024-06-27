# node-express-jwt-typescript

Install
npm install -g ts-node required for nodemon typescript

security
https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html

.env
JWT_SECRET_CODE_ACCESS_TOKEN = 'XXXX'
JWT_SECRET_CODE_REFRESH_TOKEN = 'XXXX'

login: http://localhost:3000/auth/signup
post body:
{
"email":"aa@gmail.com",
"password": "test@123"
}
return Thank you for registration: aa@gmail.com

login: http://localhost:3000/auth/login
post body:
{
"email":"aa@gmail.com",
"password": "test@123"
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

http://localhost:3000/user
get header :{
Authorization: Bearar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5Mjk0MTk5LCJleHAiOjE3MTkyOTQyMjl9.XIn4ejz7XqCtmBZOb3065CuCD-6rDX-Qq7S1e7FvrhI
}
return:
{"firstName":null,"lastName":null,"emailID":"aa@gmail.com","mobileNumber":null}

http://localhost:3000/user
put header :{
Authorization: Bearar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5Mjk0MTk5LCJleHAiOjE3MTkyOTQyMjl9.XIn4ejz7XqCtmBZOb3065CuCD-6rDX-Qq7S1e7FvrhI
}
body:
{"firstName":null,"lastName":null,"emailID":"aa@gmail.com","mobileNumber":null}
return
User updated successfully!

http://localhost:3000/user/address
post header :{
Authorization: Bearar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5Mjk0MTk5LCJleHAiOjE3MTkyOTQyMjl9.XIn4ejz7XqCtmBZOb3065CuCD-6rDX-Qq7S1e7FvrhI
}
body:
{
"line_one": "11 Saltlake",
"line_two": "Near City Center",
"city": "Kolkata",
"state": "WB"
}
return
Address created successfully!

http://localhost:3000/user/address
put header :{
Authorization: Bearar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5Mjk0MTk5LCJleHAiOjE3MTkyOTQyMjl9.XIn4ejz7XqCtmBZOb3065CuCD-6rDX-Qq7S1e7FvrhI
}
{
"id": 4, // address
"line_one":"Saltlake",
"line_two":"Near City Center",
"city":"Kolkata",
"state":"WB",
"country_name": "Albania"
}

http://localhost:3000/user/profile
post header :{
Authorization: Bearar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5Mjk0MTk5LCJleHAiOjE3MTkyOTQyMjl9.XIn4ejz7XqCtmBZOb3065CuCD-6rDX-Qq7S1e7FvrhI
}
body:
{
"line_one": "11 Saltlake",
"line_two": "Near City Center",
"city": "Kolkata",
"state": "WB"
}
return
Profie created successfully!

products: http://localhost:3000/product/getallproducts
get header :{
Authorization: Bearar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5Mjk0MTk5LCJleHAiOjE3MTkyOTQyMjl9.XIn4ejz7XqCtmBZOb3065CuCD-6rDX-Qq7S1e7FvrhI
}
return:
{
"error": "Unauthorized" // or [product]
}

# --DATALENS--
Datalens is a Article publishing website where any users can publish an article on anything and anybody can read the articles for free.

## Key Features
1. FrontEnd is written in React
2. Backend is written in Python and Node
3. Rest API is used to connect frontend and backend
4. Headless Architecture is used to connect various apps to the same DB
4. Both SQL and NoSQL Database is used
5. JWT token is used for authorization

<br>
<hr>

## Authentication
* Register and login is dynamic. In register, the user is asked to enter the email id and the entered email is checked in frontend for domain name and valid syntax. It is then checked in database to confirm that no previous accounts have been created. 
* If the email checking step is completed, the user is asked to enter a password of atleast 8 characters with one special character. The password strength is checked while typing and feedback is given based on users password input.
* The user is then prompted to enter name and then, user is asked to select interests from a set a pre configured list to best serve articles based on the chosen interests.
* After successful completion of the above steps, a verification mail is send to confirm the entered email address. 

<br>
<hr>

## Backend Specification
### Django:
For managing the data and logics related to users, django and SQL database is used. Django provides robust builtin methods for authentication. Since the dat related to users is structured, postgres is used to store user related information.
### Node:
For managing the unstructured data that comes from each articles, mongoDB is used. MongoDB helps to deal with schema less unstructured data. This server is running independently and is only managing the article related logics.

<br>
<hr>

## API
Both REST API and GraphQL is used. 
### REST API
For all the communication between Django and React, REST Api is used.
### GraphQL
For fetching the articles preview data which contains only some selected fields, GraphQL is used to improve efficiency and to reduce network usage.




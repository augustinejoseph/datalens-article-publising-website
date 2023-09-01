# --DATALENS--
Datalens is a Article publishing website where any users can publish an article on anything and anybody can read the articles for free.

<br>


![](<readme_images/Website configuration.png>)

#### Latest Website configuration can be seen [here](https://lucid.app/lucidchart/952d8061-f8cc-4004-8be0-3c885036244e/edit?viewport_loc=-3094%2C-1195%2C9356%2C3612%2C0_0&invitationId=inv_981072ed-c9e2-42a8-b38e-468c7f69a88d)

<br>

## Key Features
* **Microservice architecture.**
* **Frontend written in React.**
* **Backend written in Python and Node.js.**
* **Utilizes both GraphQL and REST APIs for communication.**
* **Follows a headless architecture for decoupled frontend and backend.**
* **Uses SQL and NoSQL databases for data storage.**
* **Implements JWT token-based authorization.**


<br>
<br>

## Authentication
* Register and login is dynamic. In register, the user is asked to enter the email id and the entered email is checked in frontend for domain name and valid syntax. It is then checked in database to confirm that no previous accounts have been created. 
* If the email checking step is completed, the user is asked to enter a password of atleast 8 characters with one special character. The password strength is checked while typing and feedback is given based on users password input.
* The user is then prompted to enter name and then, user is asked to select interests from a set a pre configured list to best serve articles based on the chosen interests.
* After successful completion of the above steps, a verification mail is send to confirm the entered email address. 
###  Refresh Tokens
Access token is valid only for 5 minutes and new access token is generated using the refresh tokens. Secret key is added to enhance the security.

<br>
<br>

## Backend Specification
### Django:
* For managing the data and logics related to users, django and SQL database is used. Django provides robust builtin methods for authentication. 
* Since the dat related to users is structured, postgres is used to store user related information.

### Node:
* For managing the unstructured data that comes from each articles, mongoDB is used. * MongoDB helps to deal with schema less unstructured data. This server is running independently and is only managing the article related logics.
* MongoDB Atlas is used to store data in mongoDB servers. 

<br>
<br>

## API
Both **REST** API and **GraphQL** is used. 
### REST API
For all the communication between Django and React, REST Api is used.
### GraphQL
For fetching the articles preview data which contains only some selected fields, GraphQL is used to improve efficiency and to reduce network usage.
### Internal API calls
Internal API calls between the Node.js server and Django server are made to update user payment details and handle users' interest inquiries.

<br>
<br>

## Webhooks
Webhooks are implemented in django to receive real time payment updates form stripe.

<br>
<br>

## Deployment
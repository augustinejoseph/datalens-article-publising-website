# --DATALENS--
Datalens is a Article publishing website where any users can publish an article on anything and anybody can read the articles for free.


## Features
### Authentication
* Register and login is dynamic. In register, the user is asked to enter the email id and the entered email is checked in frontend for domain name and valid syntax. It is then checked in database to confirm that no previous accounts have been created. 
* If the email checking step is completed, the user is asked to enter a password of atleast 8 characters with one special character. The password strength is checked while typing and feedback is given based on users password input.
* The user is then prompted to enter name and then, user is asked to select interests from a set a pre configured list to best serve articles based on the chosen interests.
* After successful completion of the above steps, a verification mail is send to confirm the entered email address. 


1. FrontEnd is written in React
2. Backend is written in Python and Node
3. Rest API is used to connect frontend and backend
4. Headless Architecture is used to connect various apps to the same DB
4. Both SQL and NoSQL Database is used
5. JWT token is used for authorization


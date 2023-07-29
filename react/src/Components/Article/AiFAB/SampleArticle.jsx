export const sampleArticle = `
    REST API is a widely used client-server communication protocol, but it has limitations when dealing with clients such as web, iOS, Android, smart devices, etc All of these have varying demands for data granularity, speed, and performance GraphQL, on the other hand, excels in this area by allowing clients to define the structure of the data to be returned by the server, as well as allowing multiple resource requests in a single query call, which makes it faster and more efficient

Its like when a teacher keeps a class register with detailed information about each student, such as their name, age, favorite color, etc

Now, lets say we wanted to know just the names of all the students in our class Without GraphQL, we might have to ask the teacher to read out the whole list of information, including things we dont need like age and favorite color That could be slow and confusing

But with GraphQL, we can ask the teacher to just give us the names of all the students That way, we only get the information we need and its much easier to understand Its like a magic spell that helps get exactly what we want, without having to look through lots of extra stuff

In this article, well explore how to build a web server with GraphQL API (powered by Apollo Server), MongoDB persistence layer and Nodejs

 Example Code
This article is accompanied by a working code example on GitHub

Why Graphql?
GraphQL is declarative: The client, not the server, decides the query responses
GraphQL is strongly-typed: During development, a GraphQL query can be guaranteed to be valid within a GraphQL-type system This strongly typed schema reduces GraphQLs error rate and adds additional validation This helps in smooth debugging and easy detection of bugs by client applications
Fetch Only Requested Data: Developers can use GraphQL to retrieve client-specified queries exactly as needed This feature eliminates problems caused by over-fetching(when a response is more verbose and contains more information than was initially requested) and under-fetching (when a request provides less verbose data than expected and is often less useful than required)
Versioning is optional: Versioning is unnecessary with GraphQL The resource URL or address remains unchanged You can add new fields and deprecate older ones When querying a deprecated field, the client receives a deprecation warning
Saves Time and Bandwidth: By allowing multiple resource requests to be made in a single query call, GraphQL reduces the number of network round trips to the server, saving time and bandwidth
When to Use Graphql?
GraphQL is an excellent solution to a unique problem involving the creation and consumption of APIs They are most effective in the following scenarios where:

Application bandwidth usage is important, such as mobile phones, smartwatches, and IoT devices
Large-scale applications with complex data requirements, GraphQLs ability to provide only the data that is needed for each query can greatly improve performance by reducing network overhead
Application requires multiple clients with different data requirements, GraphQLs flexible nature makes it easier to manage and maintain a consistent API across different platforms and devices
A hybrid pattern where applications access and manage data from multiple sources, For example, imagine a dashboard that displays data from multiple sources, such as logging services, backends for consumption statistics, and third-party analytics tools that capture end-user interactions
Prerequisites:
To follow along, youll need the following:

Basic knowledge of JavaScript
Node and npm installed on your computer: A fundamental understanding of Nodejs is required
A Curious mind
Getting the Project Started
Well be building a Student register application, that stores students data using GraphQL APIs

Lets begin by pasting the following code in the terminal to create a student-register folder and navigate into it:

mkdir student-register &&
cd student-register
To initialize Nodejs into our application run the following command:

npm init -y
Open the project in your preferred IDE

Following that, we can proceed to install our applications dependencies

In the terminal, run the following code:

npm install @apollo/server graphql-tag mongoose
Above we are installing:

@apollo/server: apollo Server turns HTTP requests and responses into GraphQL operations It has plugins, extensible support, and other features for this article will be using Apollo Server 4
graphql-tag: In Apollo Server V4 template literal tag is no longer exported, we will be using the graphql-tag for our template literal tag to parse GraphQL query strings into the standard GraphQL AST
mongoose: a MongoDB object modeling tool
Next, well create the directory and files needed for our application To do this enter the following command into the application terminal:`;

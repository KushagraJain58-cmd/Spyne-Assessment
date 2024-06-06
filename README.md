# Spyne Assessment Completed

### Postman collection link: https://api.postman.com/collections/20982082-8dd74dcd-0d5e-4806-bce7-c2371c676f41?access_key=PMAT-01HZQVK7MF2RDZ1AFYHW8YY2R3

# LLD document
Here's a detailed LLD:

#### 1. Modules

###### User Module

Responsibilities: User registration, login, updating profile, following other users, searching users.
Entities: User
Relationships: A user can follow multiple users.

###### Discussion Module

Responsibilities: Creating, updating, deleting discussions, fetching discussions based on tags or text, liking, and viewing discussions.
Entities: Discussion, Comment
Relationships: A discussion is created by a user and can have multiple comments and likes.

###### Comment Module

Responsibilities: Adding, updating, deleting comments, liking comments, replying to comments.
Entities: Comment
Relationships: A comment belongs to a discussion and is made by a user. Comments can have replies.


#### 2. Entities and Relationships

###### User

_id: ObjectId
name: String
mobileNo: String (unique)
email: String (unique)
password: String
following: [ObjectId] (references User)

###### Discussion

_id: ObjectId
text: String
image: String
hashTags: [String]
createdOn: Date
user: ObjectId (references User)
comments: [ObjectId] (references Comment)
likes: [ObjectId] (references User)
viewCount: Number

###### Comment

_id: ObjectId
text: String
createdOn: Date
user: ObjectId (references User)
discussion: ObjectId (references Discussion)
likes: [ObjectId] (references User)
replies: [ObjectId] (references Comment)


#### 3. API Endpoints

###### User Module

POST /users/signup: Create a new user.
POST /users/login: Login user.
PUT /users/
: Update user details.
DELETE /users/
: Delete user.
GET /users: Get list of users.
GET /users/search?name=xyz: Search users by name.
POST /users/follow/
: Follow another user.


###### Discussion Module

POST /discussions: Create a new discussion.
PUT /discussions/
: Update a discussion.
DELETE /discussions/
: Delete a discussion.
GET /discussions: Get discussions based on tags or text.
POST /discussions/
/like: Like a discussion.
POST /discussions/
/view: Increment view count.


###### Comment Module

POST /comments: Add a new comment.
PUT /comments/
: Update a comment.
DELETE /comments/
: Delete a comment.
POST /comments/
/like: Like a comment.
POST /comments/
/reply: Reply to a comment.


#### 4. Database Schemas

###### User Schema

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


###### Discussion Schema

const DiscussionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    image: String,
    hashTags: [String],
    createdOn: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    viewCount: { type: Number, default: 0 }
});


###### Comment Schema

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    discussion: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


## 5. Microservice Architecture

#### Considering microservices, we can separate the application into the following services:

###### User Service

Handles user-related operations (CRUD, authentication, following).


###### Discussion Service

Handles discussion-related operations (CRUD, searching, liking, view counting).


###### Comment Service

Handles comment-related operations (CRUD, liking, replying).
Each service can be a separate Node.js application with its own database collections and API endpoints. They communicate with each other via HTTP or a message broker like RabbitMQ or Kafka.

#### Example of a Microservice Setup:

###### User Service

Endpoint: /users
Database: users

###### Discussion Service
Endpoint: /discussions
Database: discussions

###### Comment Service
Endpoint: /comments
Database: comments

###### Communication Example:

When a new comment is added, the Comment Service notifies the Discussion Service to update the comments field in the corresponding discussion.

### Summary

This LLD provides a clear structure for the application, covering modules, entities, relationships, API endpoints, and a potential microservice architecture. This design ensures scalability, maintainability, and a clear separation of concerns.



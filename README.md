# SOCIAL
APIs for a Social Media

### Features
    - Create a User Account
    - Add a social media post
    - Follow a user
    - Fetch a User Profile
    - Get Posts

### Database Models
    - User (name, posts[], followers[], following[])
    - Post (postId, caption, imageUrl, upvotes, createdUser)
    - Follow (fromUser, toUser)

### Folder Structure
    - build (production build)
       - server.js (production build file)
    - config (configuration files)
      - environment.js (development and production environment configurations)
      - mongoose.js (for database connection)
    - controllers
      - followController.js (contains controllers related to follow)
      - postController.js (contains controllers related to posts)
      - userController.js (contains controllers related to user)
    - models
      - follow.js (for creating follow database model)
      - post.js (for creating post database model)
      - user.js (for creating user database model)
    - routes
      - api(api routes)
        - index.js (api routes)
    - index.js
    - package.json
    - package-lock.json
    
### How to Start
     npm start (for development mode)
     npm run build (for production build)
     npm run prod_start (for production mode)
### When Running in Local System
     run the the code in postman with corresponding routes and data
     API Documentation: https://documenter.getpostman.com/view/11914360/TVYM4vRx

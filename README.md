Author: Parth Agrawal
Contact: agrawal.parth9@gmail.com

This repository is focusing on the Backend of Spotify Replica App.
For frontend kindly check "SpotifyReplicaUI" repository. (https://github.com/parthagrawal9/SpotifyReplicaUI)

Problem Statement:

Create a Spotify like website with basic CRUD and song listings using an MVC web-framework of your choice
(Asp.NET MVC / Asp.NET Core / Django / Rails / MEAN stack).

We would like to have the following entities in the application.

Artists

- Name
- DOB
- Bio

Songs

- Name
- Date of Release
- Cover (image)
  
User

- Name
- Email

Relationships

  ● Artist can sing multiple songs

  ● Song can be sung by multiple artists

  ● Users can rate a song (rating between 1 - 5)


Application specifics (minimum requirements)

  ● Home Screen

    ○ Top 10 Songs (by Avg Rating)

        ■ Show Cover (image), Name, Date of Release, Avg. Rating and all Artists of the song

        ■ Add a ‘New Song’ button

        ■ Allow users to rate the Song from this screen

    ○ Top 10 Artists (by Avg Rating of their Songs)

        ■ Show Name, DOB and Avg. Rating
  
  ● Add a ‘New Song’

    ○ Screen to ‘add’ a new Song with the necessary fields with existing Artists. If the user wants to add a new ‘Artist’ while creating the Song which is not present in the database then he should be able to add new artists from the same screen using Ajax.

TECH STACK:
    
    MEAN: MongoDB, ExpressJS, AngularJS, NodeJS

APPLICATION:

    - The application is created using express generator.

    - Screenshots of the application are added in screenshots folder of UI repo. (https://github.com/parthagrawal9/SpotifyReplicaUI/tree/master/screenshots)

    - Basic Auth is used.

    - For testing I have commented the code for bcrypt encryption. To use Bcrypt encryption just uncomment the code in routes/userRoutes.js and  models/user.js

    - Using MongoDB as Database. I am running MongoDB on docker as it is simple to use and to avoid config issues. Instructions for running on docker are given below in this document

    - DB Script is added in the root folder. (https://github.com/parthagrawal9/SpotifyReplica/blob/master/loadData.js)

    - I am using assets/song_cover to storing the cover images of the songs. If the user is not providing any image then by default a default image is refered.

    - basic-auth.js file contains the basic authentication logic

    - models folder consist of models / schemas of artist, song and user

    - routes folder consist of routes for artist, song, user.

    - I have added routes as per the requirement of the application and basic crud operations.

    - Using multer for dealing with cover images of the songs

    - Using mongoose to interact with mongodb

RUN APPLICATION:

    1. clone the repo

    2. go to the application folder

    3. run `npm install` to install node_modules

    4. Make sure mongodb server is running and having data. 
    (refer mongo db script guide to populate the data in your mongodb server in this document below)

    5. `nodemon index.js` or `node index.js` to run the application

DEPLOYMENT:

    - To deploy backend go to root folder of the application and push the code to a github repo. 

    - On your server install git, node, mongodb, docker(if you want to runmongo on docker to avoid config issues)

    - Clone the repo of backend from github

    - Go to the folder and `npm install`

    - Make sure you have given proper security groups to access port 80, 3000

    - Make sure mongodb server is running on default port 27017

    - Make sure mongodb server is running and having data. 
    (refer mongo db script guide to populate the data in your mongodb server in this document below)

    - `node app.js` to run the application OR you can run the app using pm2(better option)

    - `npm install pm2 -g` to install pm2

    - `sudo pm2 start app.js` to run the app using pm2

    - `sudo pm2 startup` to start pm2 on startup / reboot

DB SCRIPT:

    - In root folder loadData.js is the script to populate data in mongodb

    - Go to the mongoDB shell

    - `use SpotifyReplica` command to use db named SpotifyReplica

    - `load(path_to_loadData.js)` to populate the data. It should print 'true' on sucessful execution

    - Now your data is populated and is ready tp deliver

MONGODB DOCKER:

    The very first thing is to understand the use of docker. When deploying the app from production to server, many time we face difficulties because of configuration and dependencies. To avoid such a scenerio we use docker so the config and dependencies are bundled together and can be used on any platform.

    Steps to use mongodb on docker:

        - install docker on your system / server

        - `sudo docker run -d -p 27017:27017 -v ~/path_to_store_data:/data/db mongo` to create and run a mongodb container

        - `mongo localhost/SpotifyReplica` to connect to the mongo shell

        - You might need to install mongo-client to run the above mentioned command.

        - Thats all. You are all set with mongo db container. :)

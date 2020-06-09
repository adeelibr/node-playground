### Create project

Kindly ensure that the node version you are using is above Node v8.2.0, you can check this
by doing

```
node --version
```

Next using express-generator, initialize a new project by running this command in your
terminal

```
npx express-generator --veiw=ejs chapter_1:chat
```

This will create a folder structure for you like this;

```
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
```

7 directories, 9 files

### Commands

First install all your modules by doing

```
npm i;
```

To run the project inside your project folder, open terminal & type

```
npm start
```

For debug mode

```
DEBUG=chapter-1-chat:* npm start
```
# How to run this project

- Clone this Project
- Add a PDF file in `src/example.pdf`.
- Create a .env file in `/` root of this project, with following properties in it:
```
VITE_PUBLISHER_ID = {NUMBER}
VITE_SUBSCRIBER_ID = {NUMBER}
VITE_CHANNEL_NAME = {String}
VITE_APP_ID = {string}
VITE_PUB_TOKEN = {string}
VITE_SUB_TOKEN = {string}
```

Currently this project expects Agora Projects to work without a Auth Token, so above pub/sub tokens are
optional

Once the setup is complete, run the folllowing:

```sh
yarn
yarn dev
```

Project is served @ `localhost:3000`

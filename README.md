# futurevoices.radio

## Frontend Server

### Deployment

(Right now there is no auto deploy installed)

1. Copy everything from the `main` branch into `gencomp.medienhaus.udk-berlin.de/home/vinzenz/zukunftsmusik.radio/public`
2. SSH into the server and run `npm install --production` and then `npm run prod`
3. The node server is rebuilt and restarted to serve the frontend.

## Frontend Static (Deprecated)

### Deployment

1. Check api paths in `nuxt.config.js` are `https://zukunftsmusik.radio:8093/`
2. Run `yarn generate`
3. Copy the contents of the `build` folder to `gencomp.medienhaus.udk-berlin.de/home/vinzenz/zukunftsmusik.radio/public`

## API Server

### Deployment

1. Upload the folder to `gencomp.medienhaus.udk-berlin.de/home/vinzenz/zukunftsmusik.radio/node`
2. SSH into ` ssh {user}@gencomp.medienhaus.udk-berlin.de -p 2222`
3. Go to folder and run `npm install`
4. Get the process id with `sudo pm2 ls`
5. Restart the server with `sudo pm2 restart {processid}`

### Public

[https://zukunftsmusik.radio/](https://zukunftsmusik.radio/)

### Private

[https://zukunftsmusik.radio/manager/](https://zukunftsmusik.radio/manager/)
[https://zukunftsmusik.radio/fileupload/](https://zukunftsmusik.radio/fileupload/)

### Api

Get all audio: GET `localhost:8093/audio`
Add new audio: POST `localhost:8093/audio`
Delete audio: DELETE `localhost:8093/audio/5fcf5b54d2ee4c490f32bc4d`

**Testing Apis in Postman**
`DELETE https://zukunftsmusik.radio:8093/private/audio/test/123123` -> just returns an obj

### Security

To secure the api's all private ones run under `.../private/...`. They're protected with auth from the nginx auth. Same goes for the backend at `./manager`.

### Local Development

To use the online apis locally, change the nuxt axios base url to `https://zukunftsmusik.radio/`. Don't forget to change it back!

To use the secret online apis locally, pass the auth params with the request. Don't forget to change it back and necer commit!

## Design

[Figma Board](https://www.figma.com/file/1nBrIeekQxJ4NEYrCiObxx/Future-Voices?node-id=307%3A3)

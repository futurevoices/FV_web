# futurevoices.radio

## Frontend

### Deployment

1. Check api paths in `nuxt.config.js` are `https://zukunftsmusik.radio:8093/`
2. Run `yarn generate`
3. Copy the contents of the `build` folder to `gencomp.medienhaus.udk-berlin.de/home/vinzenz/zukunftsmusik.radio/public`

## Server

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

#### Testing Apis in Postman

`DELETE https://zukunftsmusik.radio:8093/audio/test/123123` -> just returns an obj

### Design

[Figma Board](https://www.figma.com/file/1nBrIeekQxJ4NEYrCiObxx/Future-Voices?node-id=307%3A3)

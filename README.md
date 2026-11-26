# futurevoices.radio

## Current setup: futurevoices.s4ntp.org (since November 2026)

The domain `futurevoices.radio` expired on 29.10.2026. The site now runs at
[https://futurevoices.s4ntp.org/](https://futurevoices.s4ntp.org/), on the same server
(`gencomp.medienhaus.udk-berlin.de`, SSH port 2222). `*.s4ntp.org` has a wildcard DNS record
to this server, so a new subdomain needs no DNS change.

| Part | Where | Port |
|---|---|---|
| Frontend (this branch, `client/`) | `~/futurevoices-gencomp`, pm2 `future voices frontend (gencomp /futurevoices)` | 8097 |
| Old frontend (`main`, for `futurevoices.radio`) | `~/zukunftsmusik.radio/public`, pm2 `future voices frontend` | 8096 |
| API server (`server/`) | `~/zukunftsmusik.radio/node`, pm2 `future voices backend + db` | 8094 |

- nginx: `/etc/nginx/sites-available/futurevoices-s4ntp` (certificate by certbot).
  `/manager`, `/fileupload` and `/audio/private` use basic auth with
  `~/zukunftsmusik.radio/.htpasswd`.
- `https://gencomp.medienhaus.udk-berlin.de/futurevoices/` redirects to the new address
  (`/etc/nginx/snippets/futurevoices.conf`, included in the gencomp block of
  `/etc/nginx/sites-available/s4ntp`).
- Port 8094 is blocked from outside by the systemd unit `futurevoices-block-8094`
  (iptables). Before that, the private API was reachable without auth on
  `:8094/audio/private/...`. nginx reaches the API through `127.0.0.1`.
- Matomo is removed: `stats.vinzenzaubry.com` does not answer any more.
- Cyberia (the Unity WebGL world, compiled build only, no source) is served at `/cyberia/`:
  on the server, `~/futurevoices-gencomp/static/cyberia` is a symlink to
  `~/cyberia.futurevoices.radio` (190 MB, not in git). Its built-in text still names futurevoices.radio.
- Contact address: tutorengencomp@gmail.com.
- `client/package.json` and the lock files match what is installed on the server
  (Node 14.15.3, `sass ~1.32.12`, `js-yaml ^3`). Newer versions do not build with Node 14.

### Deploy the frontend

1. Copy `client/` without `node_modules`, `.nuxt` and `ecosystem.config.js` to
   `~/futurevoices-gencomp` (the folder keeps its own `ecosystem.config.js` with `PORT: 8097`).
2. On the server: `cd ~/futurevoices-gencomp && ./node_modules/.bin/nuxt build`
3. `pm2 restart "future voices frontend (gencomp /futurevoices)"`

## Frontend Server (futurevoices.radio, until 2026)

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

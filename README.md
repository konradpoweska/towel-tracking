# Towel Tracking

Reduce your family home bathroom's enthropy, by tracking the usage of your towel collection in a web app with a sleek UI.

- See which towels are above the usage duration threshold, and need cleaning, and which ones do not, saving water, power,
- Let people know that their towel has been cleaned, so that they do not need to run around the house looking for it,
- Track who is recklessly using 4 towels at once.

## Try it out [here](https://towels-demo.apps.konradpoweska.com/)

No login. A unique user will be generated for you, automatically deleted.

## Using the app

You are welcome to use my deployed app at [towel-tracking.apps.konradpoweska.com](https://towel-tracking.apps.konradpoweska.com/). The only supported login method is with a Google account. The app uses your public info, such as you email and name.

## Running the app

### Creating the configuration

1. Use this bash script to generate the secrets.

   ```sh
   gen_secret() { openssl rand -base64 48 | sed "s/[=+/]/-/g" }

   for var in MONGO_PASSWORD AUTH_SECRET SIGNING_SECRET; do
     printf "%s=%s\n" $var $(gen_secret) >> .env
   done
   ```

2. Add those variables to your `.env` file.

   ```sh
   MONGO_DB=towel-tracking
   MONGO_USERNAME=towel-tracking
   ```

3. Use [this guide](https://medium.com/@uriser/authentication-in-sveltekit-with-auth-js-7ff505d584c4) to generate your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, and add them as well.

### Run in development

1. Add this to your `.env`:

   ```
   MONGO_URL=mongodb://$MONGO_USERNAME:$MONGO_PASSWORD@127.0.0.1/
   ```

2. Use the alternate [`docker-compose.db.yml`](./docker-compose.db.yml) to run a local MongoDB instance:

   ```sh
   docker compose -f docker-compose.db.yml up -d
   ```

3. Run
   ```sh
   npm install
   npm run dev
   ```

### Run a production instance

> [!NOTE]
> It requires placing it behind an HTTPS reverse proxy.

1. Edit [`docker-compose.yml`](`./docker-compose.yml`) to adapt to your proxy configuration.

2. Run `docker compose up -d`.

## App details

This app is built with [SvelteKit](https://kit.svelte.dev/), the [Carbon design system](https://carbondesignsystem.com/), MongoDB and [Auth.js](https://authjs.dev/reference/sveltekit).

### Configuration

Required environment variables for the app:

- `MONGO_URL` and `MONGO_DB`
- `AUTH_SECRET`: random string, for auth session tokens
- `SIGNING_SECRET`: random string, used for creating and verifying invite URLs
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: generated on [GCP](https://console.cloud.google.com/apis/credentials/oauthclient),

See [`.env.example`](./.env.example) for a configuration template.

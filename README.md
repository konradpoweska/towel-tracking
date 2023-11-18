# Towel Tracking

Reduce your family home bathroom's enthropy, by tracking the usage of your towel collection in a web app with a sleek UI.

- See which towels are above the usage duration threshold, and need cleaning, and which ones do not, saving water, power,
- Let people know that their towel have been cleaned, so that they do not need to run around the house looking for it,
- Track who is recklessly using 4 towels at once.

## Configuration

Required environment variables:

- `MONGO_URL` and `MONGO_DB`
- `AUTH_SECRET`: random string
- `SIGNING_SECRET`: random string
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: generated on [GCP](https://console.cloud.google.com/apis/credentials/oauthclient)

See [`.env.example`](./.env.example) for a configuration template.

The OAuth credentials need to be configured to match your setup, I used [this guide](https://medium.com/@uriser/authentication-in-sveltekit-with-auth-js-7ff505d584c4).

## Developing

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

# XSIP Pulse (real-time version)

Real-time XSIP records with Google sign-in. Every approved user sees the same data, and changes
appear on everyone's screen within about a second. A "Live (N online)" badge shows who has the page open.

Built on Firebase (free Spark plan is enough for a small team): Authentication (Google), Firestore (live data)
and Hosting (your web address).

## Roles
- **Editor** (emails you list): can import, add, update, edit and delete records.
- **Viewer** (anyone who signs in with a Google account): can see live data, filter and export, but cannot change anything.
- Nobody can see the records without signing in with Google.

## One-time setup (about 15 minutes)

1. **Create a project.** Go to https://console.firebase.google.com > Add project.
2. **Turn on Google sign-in.** Build > Authentication > Get started > Sign-in method > Google > Enable > Save.
3. **Create the database.** Build > Firestore Database > Create database > Production mode.
   Choose a location close to you (for India: `asia-south1 (Mumbai)`). The location cannot be changed later.
4. **Register the web app.** Project settings (gear icon) > Your apps > Web (</>) > register.
   Copy the settings shown and paste them into `public/firebase-config.js`.
5. **Create the editor list.** In Firestore Database > Start collection:
   - Collection ID: `config`
   - Document ID: `access`
   - Field `editors` (type: array) with the emails of people who may change data, as strings, e.g. `you@gmail.com`
   Use lowercase emails exactly as the Google account shows them. Everyone else who signs in can view only.
   To add or remove editors later, edit this document in the console. No redeploy is needed.
6. **Install the Firebase tools** (needs Node.js): `npm install -g firebase-tools`
7. **Deploy** from this folder:
   ```
   firebase login
   firebase use --add        (pick your project)
   firebase deploy
   ```
   This publishes the page (Hosting) and the security rules (Firestore).
8. Open the address printed at the end, for example `https://your-project.web.app`.

## Try it on your computer first
```
cd public
python -m http.server 8080
```
Open http://localhost:8080. Google sign-in works on localhost by default. Data is the same live data
as the hosted site, because it uses the same Firebase project.

## Using your own domain
Firebase console > Hosting > Add custom domain. Then add the domain under
Authentication > Settings > Authorized domains.

## How the data is stored
- One Firestore document per record in the `records` collection. The document id comes from
  XSIP Reg. Number + Order Id (or Order Date when Order Id is blank), so importing the same file again updates
  existing records instead of duplicating them.
- Every saved record notes who changed it last (`updatedBy`, `updatedAt`).
- Two people editing different records never overwrite each other. If two people edit the exact same record
  at the same moment, the last save wins.

## Good to know
- **Cost:** a page load reads every record once. The free plan allows 50,000 reads and 20,000 writes per day,
  which comfortably covers a few thousand records and a small team. Importing a file writes one document per
  new or changed record.
- **Online count** uses each computer's clock. If a computer's clock is off by more than a minute or so,
  that person may not show as online.
- The Firebase settings in `firebase-config.js` are public by design. Security comes from `firestore.rules`
  and the editor list, so do not skip step 5 or step 7.
- Each user's column choices and the "Highlight purchase done" setting are remembered in their own browser.

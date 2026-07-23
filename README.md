# GYST — Setup Guide

A personal browser-based dashboard with widget bookmarks, drag-and-drop layout, and per-user config sync via Firebase.

---

## What you get

- `index.html` — Login / sign-up page
- `app.html` — The GYST dashboard
- Each user who signs up gets their own private layout stored in Firebase
- Anyone you share the URL with starts with a clean default — your customisations are never visible to others

---

## Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → give it a name (e.g. `my-GYST`) → Continue
3. Disable Google Analytics if you don't need it → **Create project**

---

## Step 2 — Enable Email/Password authentication

1. In your project, go to **Build → Authentication**
2. Click **Get started**
3. Under **Sign-in providers**, click **Email/Password**
4. Toggle **Enable** → **Save**

---

## Step 3 — Create a Firestore database

1. Go to **Build → Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** → select a region close to you → **Enable**
4. Once created, go to the **Rules** tab and replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Click **Publish**

This ensures each user can only read and write their own config.

---

## Step 4 — Get your Firebase config

1. In your Firebase project, click the ⚙️ gear icon → **Project settings**
2. Scroll to **Your apps** → click the **</>** (web) icon to add a web app
3. Give it a nickname (e.g. `GYST`) → **Register app**
4. Copy the `firebaseConfig` object — it looks like this:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-GYST.firebaseapp.com",
  projectId: "my-GYST",
  storageBucket: "my-GYST.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## Step 5 — Add config to both HTML files

Open **both** `index.html` and `app.html` in a text editor.

In each file, find the `FIREBASE_CONFIG` block near the top of the `<script>` section and replace the placeholder values with your actual values from Step 4:

```js
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",           // ← paste your values here
  authDomain:        "my-GYST.firebaseapp.com",
  projectId:         "my-GYST",
  storageBucket:     "my-GYST.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
};
```

---

## Step 6 — Deploy to GitHub Pages

1. Create a new repository on [github.com](https://github.com) (e.g. `GYST`)
2. Upload `index.html`, `app.html`, and `README.md` to the repo
3. Go to **Settings → Pages**
4. Under **Source**, select **Deploy from a branch** → `main` → `/ (root)` → **Save**
5. GitHub will give you a URL like `https://yourusername.github.io/GYST/`

Your login page will be at `https://yourusername.github.io/GYST/` and the dashboard at `.../app.html`.

---

## Step 7 — Add your domain to Firebase Auth (required)

When hosted on GitHub Pages, you need to tell Firebase that your domain is authorised:

1. In Firebase Console → **Authentication → Settings → Authorised domains**
2. Click **Add domain**
3. Add `yourusername.github.io`

Without this step, sign-in will fail with an "unauthorised domain" error.

---

## Giving it to someone else

Just share your GitHub Pages URL. When they open it, they see the login page and can create their own account. Their layout is completely separate from yours — stored under their own Firebase user ID.

If you want to restrict who can sign up (e.g. school staff only), you can either:
- Add a Firestore rule that checks email domain
- Disable public sign-up in Firebase Auth and manually create accounts for people

---

## Notes

**Config size:** Each user's layout is stored as a single Firestore document (max 1 MB). If you upload many high-resolution logos as images, the config can grow large. Consider linking to hosted image URLs instead of uploading files directly.

**Export / Import:** Use the user menu (top-right) to export your config as a JSON backup or import a previously exported config.

**Offline:** If Firestore is unreachable, the app falls back to the last config saved in your browser's localStorage.

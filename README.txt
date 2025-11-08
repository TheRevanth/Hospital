SIMPLE EMAIL + CODE AUTH (Node.js + Google Apps Script)

What you received:
- Node server (server.js)
- Frontend (public/index.html + protected.html)
- Apps Script code (apps-script/Code.gs)
- .env.example (set APPS_SCRIPT_URL and API_SECRET)
- package.json

Quick setup:
1) Unzip and open folder.
2) Copy .env.example -> .env and fill:
   APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
   API_SECRET=some-long-secret
3) Edit server.js allowedPlain list with your real 10 emails + their plain passwords.
4) On Google Apps Script, create a new script, paste apps-script/Code.gs content, set API_SECRET to same secret,
   Deploy -> New deployment -> Web app -> Execute as: Me, Access: Anyone (or Anyone, even anonymous).
   Copy the deployment URL and put it in .env -> APPS_SCRIPT_URL.
5) Install deps:
   npm install
6) Start server:
   npm start
7) Open http://localhost:3000/ and sign in with one of the allowed emails and password.
   Check your Gmail (the account that deployed the Apps Script) for the code email.
8) Enter code and access protected page.

Security notes:
- Keep API_SECRET secret.
- Google Apps Script sends email from the account that deployed the script — watch Gmail quotas.
- This minimal implementation does not create persistent sessions; implement sessions/JWT if needed.

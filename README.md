# English Buddy AI

A responsive English-learning PWA with a level-based AI speaking partner, vocabulary expansion, quizzes, and optional Supabase email authentication.

## Features
- Six progressive learning levels: Beginner, Elementary, Intermediate, Upper-Intermediate, Advanced, Expert.
- Level-matched conversation examples and AI replies/corrections.
- AI voice replies (browser speech synthesis) and speech-to-text where supported.
- Vocabulary generated in batches of 20 when the AI server is configured. The interface is designed for a growing 10,000+ word library; generated words are filtered against words already seen on that device.
- Sign up / log in UI backed by Supabase Auth when configured.
- PWA manifest and service worker.

## Run locally
Requires Node.js 18+.

```bash
npm start
```

Copy `.env.example` to `.env` and set environment variables in your hosting provider (or load them locally with your preferred environment-variable tool):
- `OPENAI_API_KEY` — required for live Buddy replies and vocabulary generation.
- `OPENAI_MODEL` — optional; defaults to `gpt-4o-mini`.
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` — required for real email sign-up/login. Create a Supabase project, enable Email auth, and configure the allowed site URL/redirect URLs. Never put the Supabase service-role key or OpenAI key in browser code.
- `PORT` — optional.

## Deploy
Deploy this Node.js project to a host that runs Node servers (not static-only hosting). Set the environment variables in the host dashboard. Add your deployed HTTPS domain to Supabase Auth's Site URL and Redirect URLs. The app's `/api/chat`, `/api/vocabulary`, and `/api/auth/*` endpoints are served by `server.js`.

## Important
The starter ZIP is source code, not a hosted live service. AI replies, generated vocabulary and real account creation work only after the server is deployed and the relevant secrets are configured. Without Supabase settings, the sign-up screen will explain that account service is not configured. The 10,000+ target is a scalable generated vocabulary library, not 10,000 hand-written entries bundled into this ZIP. Previously seen generated words are tracked on the learner's device to reduce repeats.

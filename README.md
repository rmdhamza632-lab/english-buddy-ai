# Fluentia: ফ্রিতে অনলাইনে চালু করার গাইড

খরচ ০ টাকা: Netlify ফ্রি প্ল্যান + Google Gemini ফ্রি এআই। ডোমেইন হবে `তোমার-নাম.netlify.app`। (.com কিনতে হয়, ফ্রি পাওয়া যায় না। পরে চাইলে যোগ করা যাবে।)

ফোল্ডারে আছে:
- `index.html`: পুরো ওয়েবসাইট
- `netlify/functions/ai.js`: এআই টিউটরের ছোট সার্ভার ফাংশন (key এখানে গোপন থাকে)
- `netlify.toml`: Netlify-র সেটিং

## ধাপ ১: ফ্রি Gemini key নাও
1. aistudio.google.com এ Google অ্যাকাউন্ট দিয়ে ঢোকো।
2. **Get API key → Create API key** চাপো। কার্ড লাগে না, billing চালু করবে না (করলে ফ্রি থাকবে না)।
3. key কপি করে রাখো, কাউকে দিও না।

## ধাপ ২: GitHub-এ আপলোড
1. github.com এ নতুন repository বানাও, নাম `fluentia`।
2. **Add file → Upload files** দিয়ে `index.html` ও `netlify.toml` আপলোড করো।
3. **Add file → Create new file** চাপো, নামের ঘরে লেখো `netlify/functions/ai.js`, তারপর `ai.js`-এর পুরো কোড পেস্ট করে Commit করো।

## ধাপ ৩: Netlify-তে চালু করো (Free plan)
1. app.netlify.com এ GitHub দিয়ে সাইন আপ করো।
2. **Add new project → Import an existing project → GitHub** থেকে `fluentia` বেছে নাও, সেটিং না বদলে **Deploy** চাপো।
3. **Project configuration → Environment variables** এ যোগ করো: `GEMINI_API_KEY` = তোমার key
4. **Deploys → Trigger deploy** দিয়ে আবার ডিপ্লয় করো।
5. লিংকের নাম বদলাতে **Project configuration → General → Project name** এ নাম দাও, লিংক হবে `নাম.netlify.app`।

## ধাপ ৪: পরীক্ষা
- সাইট খুলে Speak ট্যাবে টিউটরের প্রশ্ন আসছে কি না দেখো।
- Account → **Test voice** দিয়ে ভয়েস পরীক্ষা করো।
- মাইকের জন্য ব্রাউজারে Allow করতে হবে। Chrome-এ সবচেয়ে ভালো চলে।

## সমস্যা হলে
- **"AI unavailable":** key ঠিক বসেছে কি না দেখো এবং env variable বসানোর পরে আবার ডিপ্লয় করেছ কি না দেখো।
- **মডেল error:** AI Studio-তে ফ্রি মডেলের নাম দেখে `GEMINI_MODEL` নামে env variable বসাও। ডিফল্ট `gemini-flash-latest`।
- **কিছুক্ষণ পর এআই চলছে না:** ফ্রি কোটা শেষ। সীমা প্রতি প্রজেক্টে ধরা হয়, তাই সব ব্যবহারকারী একই কোটা ভাগ করে। কিছু সময় পরে আবার চলবে।

## জেনে রাখো
- ফ্রি Gemini-তে পাঠানো লেখা Google তাদের প্রোডাক্ট উন্নত করতে ব্যবহার করতে পারে। ব্যবহারকারীদের ব্যক্তিগত তথ্য লিখতে নিরুৎসাহিত করো।
- Netlify ফ্রিতে মাসে ৩০০ ক্রেডিট। শেষ হলে সাইট পজ হয়, বাড়তি বিল আসে না।
- অ্যাকাউন্ট ও XP ব্যবহারকারীর নিজের ব্রাউজারে থাকে।
- ব্যানারের ছবিগুলো তোমার দেওয়া। পাবলিক করার আগে ব্যবহারের অধিকার নিশ্চিত করে নিও।
- পরে বেশি ব্যবহারকারী হলে `ANTHROPIC_API_KEY` বসিয়ে Claude দিয়ে চালানো যায়।

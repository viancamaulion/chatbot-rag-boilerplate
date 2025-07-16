### Project Setup

1. Run `npm i` to install dependencies.
2. Set up env variables.

- Refer to `.env.example` file. The env values will be provided in the code-cuts channel.
- ✅ Recommended: Connect to the provided remote database to skip lengthy RAG/database set-up.

3. Run `npm run dev`

### 🧩 Optional & Advanced Path (⚠️ Recommended Only if You Want Full Database Control — Setup Takes More Time): Set Up Your Own Supabase Instance

1. Create your own Supabase account and project
2. To get your Supabase project's env keys, go to your Supabase Dashboard. Refer to `.env.example` for the env variables.
3. Run `npm i` and `npm run dev`
4. Follow these slides 17 to 25 for RAG set-up:

- Run the provided sql commands to your project's SQL Editor. Feel free to copy-paste and/or customize them.
- Figma Slides Link: https://www.figma.com/slides/0h1y8V4hZb94LbFViDjO7Q/Code-Cuts--Chatbot-Dev---RAG?node-id=3-42&t=uw2BWPJOwJlYEIM3-0
- Don't forget to run `npm run generate:embeddings` after populating your table (this is to generate vector embeddings for your data that the chatbot will use later on).

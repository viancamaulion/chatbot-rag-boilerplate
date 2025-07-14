### For connecting to remote database (Recommended for faster RAG set-up):

1. Set up env variables. Refer to `.env.example` file. The values will be provided in the code-cuts channel.
   - # Chatbot
     OPENAI_API_KEY=
   - # Supabase
     NEXT_PUBLIC_SUPABASE_URL=
     NEXT_PUBLIC_SUPABASE_ANON_KEY=

### If you'd like to create your own database (Could be time-consuming):

1. Create your own Supabase account and project
2. Set up env variables. Refer to `.env.example` file.
3. Open Docker and run `npx supabase start` to initialize your local database
4. Get your local env keys in the terminal by running `npx supabase status`
5. Open http://localhost:54323/project/default/editor/17434 to view your local database's dashboard
6. Create migrations for your table/data:
   - `npx supabase migration new <create_table_name>`
   - Refer to this migration file for the table schema: `https://www.figma.com/slides/0h1y8V4hZb94LbFViDjO7Q/Code-Cuts--Chatbot-Dev---RAG?node-id=61-27&t=Dts4NYD6L22air0B-0`
7. Create a migration file for your embeddings:

   - `npx supabase migration new <create_table_name_embeddings>`
   - Refer to this migration file for the embeddings schema: `https://www.figma.com/slides/0h1y8V4hZb94LbFViDjO7Q/Code-Cuts--Chatbot-Dev---RAG?node-id=61-27&t=Dts4NYD6L22air0B-0`

8. Apply migrations to your local database:

   - `npx supabase db reset`

9. Push your local changes to remote database:
   - `npx supabase link --project-ref <project_ref>`
   - `npx supabase db push`

### Project Setup

1. Set up env variables. Refer to `.env.example` file. The values will be provided in the code-cuts channel.
2. Run npm install to install dependencies

### Recommended: Connecting to the provided remote database for faster RAG set-up:

### Optional: If you'd like to create your own database, then develop locally (Could be time-consuming):

1. Create your own Supabase account and project
2. Open Docker and run `npx supabase start` to initialize your local database
3. Set up env variables. Refer to `.env.example` file. Get your local env keys in the terminal by running `npx supabase status`
4. Open http://localhost:54323/project/default/editor/17434 to view your local database's dashboard
5. Follow these slides 16 to 20 for RAG set-up: https://www.figma.com/slides/0h1y8V4hZb94LbFViDjO7Q/Code-Cuts--Chatbot-Dev---RAG?node-id=65-65&t=WvWnUaxg7qzk21nm-0

### Tips

- Create migrations for your table/data:

  - `npx supabase migration new <create_table_name>`

- Apply migrations to your local database:

  - `npx supabase db reset`

- Apply/Push your local changes/migrations to remote database:
  - `npx supabase link --project-ref <project_ref>`
    e.g npx supabase link --project-ref ymqlpcjezyrtxyfbqcmc
  - `npx supabase db push`

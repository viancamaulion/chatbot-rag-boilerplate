create extension if not exists vector;

create table if not exists company_embeddings (
    id uuid default uuid_generate_v4() primary key,
    company_id uuid not null unique,
    content text,
    embedding vector(1536),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
)

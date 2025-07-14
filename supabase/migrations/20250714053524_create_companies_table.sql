create table if not exists companies (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    slug text,
    description text,
    website text,
    specializations text[],
    business_email text,
    phone_number text,
    logo text,
    tagline text,
    employees_count text,
    country text,
    state text,
    year_founded int,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
)

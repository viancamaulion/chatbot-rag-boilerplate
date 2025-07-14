create function chatbot_company_matcher(
    user_query_embedding vector,
    match_count int,
    match_threshold float
)
returns table(
    company_id uuid,
    content text,
    similarity_score float
)
language sql
as $$
    select
        company_id,
        content,
        1 - (embedding <-> user_query_embedding) as similarity_score
    from company_embeddings
    where embedding <#> user_query_embedding < (1 - match_threshold)
    order by embedding <-> user_query_embedding
    limit match_count;
$$;

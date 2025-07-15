import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { embedMany } from 'ai'
import { openai } from '@ai-sdk/openai'

// Set up our Supabase Client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function generateCompanyEmbeddings() {
  const { data: companies } = await supabase.from('companies').select('*')

  if (!companies) {
    console.log('No companies found')
    return
  }

  // 1. Prepare content strings for embedding
  const contents = companies.map((company) =>
    JSON.stringify({
      company_id: company.id,
      business_email: company.business_email,
      country: company.country ?? '',
      description: company.description ?? '',
      employee_count: company.employee_count,
      logo: company.logo,
      name: company.name,
      phone_number: company.phone_number,
      slug: company.slug,
      specializations: company.specializations ?? [],
      state: company.state ?? '',
      tagline: company.tagline ?? '',
      year_founded: company.year_founded,
      website: company.website,
    }),
  )

  // 2. Batch embed using embedMany
  const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-3-small'),
    values: contents,
  })

  // 3. Upsert into Supabase

  // Prepare list of objects to be inserted in the vector store
  const upserts = companies.map((company, i) => ({
    company_id: company.id,
    content: contents[i],
    embedding: embeddings[i],
  }))

  await supabase.from('company_embeddings').upsert(upserts, {
    onConflict: 'company_id',
  })

  console.log('✅ Company embeddings created and stored.')
}

async function run() {
  await generateCompanyEmbeddings()
}

run().catch(console.error)

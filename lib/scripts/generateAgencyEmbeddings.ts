import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function generateAgencyEmbeddings() {
  const { data: companies } = await supabase.from('companies').select('*')

  if (!companies) {
    console.log('No companies found')
    return
  }

  for (const company of companies) {
    const content = JSON.stringify({
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
    })

    const embeddingResponse = await openai.embeddings.create({
      input: content,
      model: 'text-embedding-3-small',
    })

    const [{ embedding }] = embeddingResponse.data
    await supabase.from('company_embeddings').upsert(
      {
        company_id: company.id,
        content,
        embedding,
      },
      {
        onConflict: 'company_id',
      },
    )
  }
  console.log('✅ Company embeddings created and stored.')
}

async function run() {
  await generateAgencyEmbeddings()
}

run().catch(console.error)

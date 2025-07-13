import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function generateAgencyEmbeddings() {
  const { data: agencies } = await supabase.from('agencies').select('*')

  if (!agencies) {
    console.log('No agencies found')
    return
  }

  for (const agency of agencies) {
    const content = JSON.stringify({
      agency_id: agency.id,
      business_email: agency.business_email,
      country: agency.country ?? '',
      description: agency.description ?? '',
      employee_count: agency.employee_count,
      logo: agency.logo,
      name: agency.name,
      phone_number: agency.phone_number,
      slug: agency.slug,
      specializations: agency.specializations ?? [],
      state: agency.state ?? '',
      status: agency.status,
      tagline: agency.tagline ?? '',
      year_founded: agency.year_founded,
    })

    const embeddingResponse = await openai.embeddings.create({
      input: content,
      model: 'text-embedding-3-small',
    })

    const [{ embedding }] = embeddingResponse.data
    await supabase.from('agency_embeddings').upsert(
      {
        agency_id: agency.id,
        content,
        embedding,
      },
      {
        onConflict: 'agency_id',
      },
    )
  }
  console.log('✅ Agency embeddings created and stored.')
}

async function run() {
  await generateAgencyEmbeddings()
}

run().catch(console.error)

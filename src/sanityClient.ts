import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'dm7gnw8i',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})
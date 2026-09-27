import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: "qofqzwgs",
  dataset :"production",
  apiVersion : "2024-04-17",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.replace(/[^a-z0-9-]/gi, "") || "dev"),
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-01-01",
  useCdn: false, // Set to true for production to cache results
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

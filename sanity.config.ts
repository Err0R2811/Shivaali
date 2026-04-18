import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import product from './sanity/schemas/product'
import category from './sanity/schemas/category'

export default defineConfig({
  name: 'default',
  title: 'Rivaaj Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [product, category],
  },
})

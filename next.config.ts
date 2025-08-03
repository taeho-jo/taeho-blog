import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
  // Optionally, add any other Next.js config below
}
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeCodeTitles, rehypePrism]
  }
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)

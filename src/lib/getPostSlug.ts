import { sync } from 'glob'
import path from 'path'
import CONSTANTS from '@/constants'

const BASE_PATH = CONSTANTS.BASE_PATH
const POSTS_PATH = path.join(process.cwd(), BASE_PATH)

export const getPostSlug = async () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`)

  return postPaths.map(path => {
    return {
      slug: path.match(/([^/]+)\.mdx$/)?.[1]
    }
  })
}

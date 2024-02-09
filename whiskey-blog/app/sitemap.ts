import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): any {
  const siteUrl = siteMetadata.siteUrl
  // filter all blogs with a path that contains special characters other than a hyphen
  const blogRoutes = allBlogs
    .filter((post) => !post.draft || !post.path)
    .map((post) => ({
      url: `${siteUrl}/blog/${encodeURIComponent(post.path.split('blog/')[1])}`,
      lastModified: post.lastmod || post.date || new Date().toISOString().split('T')[0],
    }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [blogRoutes, routes].flat()
}

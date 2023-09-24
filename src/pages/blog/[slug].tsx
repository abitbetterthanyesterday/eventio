import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useStringParam } from "../../utils/utils"

const BlogPostPage: BlitzPage = () => {
  const slug = useStringParam("slug")

  return <div>Welcome to the blog post: {slug}</div>
}

export default BlogPostPage

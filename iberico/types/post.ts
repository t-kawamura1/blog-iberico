import Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  author: Author
  ogImage: {
    url: string
  }
  content: string
}

export default PostType

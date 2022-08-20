import PostPreview from './post-preview'
import Post from '../types/post'
import { VscNotebook } from "react-icons/vsc"

type Props = {
  posts: Post[]
}

const PostList = ({ posts }: Props) => {
  return (
    <section className='mb-80 px-8 md:px-20 pt-20'>
      <div className='mb-12 flex gap-2 items-center'>
        <VscNotebook className="text-xl md:text-3xl" />
        <h2 className='text-2xl '>
          新着記事
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-y-10 md:gap-y-12 pb-80">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            author={post.author}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  )
}

export default PostList

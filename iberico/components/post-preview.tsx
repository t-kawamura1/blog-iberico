import DateFormatter from './date-formatter'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  date: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  date,
  author,
  slug,
}: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostPreview

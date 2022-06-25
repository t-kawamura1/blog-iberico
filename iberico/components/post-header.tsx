import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import Author from '../types/author'

type Props = {
  title: string
  date: string
  author: Author
}

const PostHeader = ({ title, date, author }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mt-8 mb-8 md:mt-16 md:mb-12">
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostHeader

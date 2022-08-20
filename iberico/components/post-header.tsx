import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import Author from '../types/author'

type Props = {
  title: string
  date: string
}

const PostHeader = ({ title, date }: Props) => {
  return (
    <div className="pt-8 pb-2 md:pt-16 md:pb-8 flex flex-col gap-2 md:gap-4">
      <div>
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="text-sm md:text-lg text-right">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostHeader

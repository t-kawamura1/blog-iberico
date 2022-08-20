import DateFormatter from './date-formatter'
import Link from 'next/link'
import Author from '../types/author'
import { BsCalendar4Week } from "react-icons/bs"

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
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <div className="px-4 py-4 md:px-8 md:py-6 border-l-8 border-accent-green-4 shadow bg-mono-4
        flex flex-col justify-between gap-4 hover:cursor-pointer hover:shadow-lg"
      >
        <h3 className="text-base md:text-lg leading-snug">
            <a className="hover:underline">{title}</a>
        </h3>
        <div className="text-sm md:text-base flex items-center justify-end gap-2">
          <BsCalendar4Week className="text-lg md:text-xl" />
          <DateFormatter dateString={date} />
        </div>
      </div>
    </Link>
  )
}

export default PostPreview

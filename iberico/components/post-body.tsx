import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({content}: Props) => {
  console.log(content)
  return (
    <div className="">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody

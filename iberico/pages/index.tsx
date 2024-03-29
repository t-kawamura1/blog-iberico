import Container from '../components/container'
import PostList from '../components/post-list'
import Hero from '../components/hero'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../types/post'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  const postList = allPosts
  return (
    <>
      <Layout>
        <Head>
          <title>Blog Iberico</title>
        </Head>
        <div className="">
          <Hero />
        </div>
        <Container>
          {postList.length > 0 && <PostList posts={postList} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
  ])

  return {
    props: { allPosts },
  }
}

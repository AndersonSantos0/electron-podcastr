import React, { useContext } from 'react'
import Lottie from 'react-lottie'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { api } from '../../services/api'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { converDurationToTimeString } from '../../utils/converDurationToTimeString'
import styles from './episode.module.scss'
import { PlayerContext } from '../../contexts/PlayerContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import loadingAnimation from '../../animations/loading.json'

interface EpisodeInterface {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: string
  durationAsString: string
  description: string
  url: string
}

interface EpisodeProps {
  episode: EpisodeInterface
}

const Episode: React.FC<EpisodeProps> = ({ episode }) => {
  const { play } = useContext(PlayerContext)
  const router = useRouter()

  if(router.isFallback)return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Lottie
        style={{filter: 'brightness(.8)'}}
        isClickToPauseDisabled={true}
        options={{
          autoplay: true,
          loop: true,
          animationData: loadingAnimation
      }}
        height={200}
        width={200}
      />
    </div>
  )

  return (
    <div className={styles.episodeScroller}>
      <div className={styles.episode}>
        <Head>
          <title>{episode.title}</title>
        </Head>

        <div className={styles.thumbnailContainer}>
          <Link href={'/'} prefetch={false}>
            <button type="button">
              <img src="/arrow-left.svg" alt="Voltar" />
            </button>
          </Link>
          <Image
            objectFit={'cover'}
            src={episode.thumbnail}
            width={700}
            height={160}
          />
          <button type="button" onClick={() => play(episode)}>
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </div>
  )
}

export default Episode

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 10,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const paths = data.map((episode) => {
    return {
      params: {
        slug: episode.id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    description: data.description,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: data.file.duration,
    durationAsString: converDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24 * 1, // 24 hours
  }
}

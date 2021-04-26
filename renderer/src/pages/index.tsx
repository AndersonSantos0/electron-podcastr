import React from 'react'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'
import { converDurationToTimeString } from '../utils/converDurationToTimeString'
import { GetStaticProps } from 'next'
import { api } from '../services/api'
import styles from './home.module.scss'
import { usePlayer } from '../contexts/PlayerContext'
import Head from 'next/head'
import LastEpisodeItem from '../components/lastEpisodeItem/lastEpisodeItem'

interface HomeProps {
  allEpisodes: episodeInterface[]
  latestEpisodes: episodeInterface[]
}

interface episodeInterface {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: string
  durationAsString: string
  url: string
}

const Home: React.FC<HomeProps> = ({ latestEpisodes, allEpisodes }) => {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes]

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul style={{ width: '100%' }}>
          {latestEpisodes.map((episode, index) => {
            return (
              <LastEpisodeItem
                episode={episode}
                index={index}
                episodeList={episodeList}
                onPlayHandle={() => playList(episodeList, index)}
                key={episode.id}
              />
            )
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th className={styles.membersTH}>Integrantes</th>
              <th className={styles.dateTH}>Data</th>
              <th className={styles.durationTH}>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit={'cover'}
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td className={styles.membersTD}>
                    <p>{episode.members}</p>
                  </td>
                  <td className={styles.dateTD}>{episode.publishedAt}</td>
                  <td className={styles.durationTD}>
                    {episode.durationAsString}
                  </td>
                  <td>
                    <button
                      type={'button'}
                      onClick={() =>
                        playList(episodeList, index + latestEpisodes.length)
                      }
                    >
                      <img src="/play-green.svg" alt="Play episode" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Home

//-----------//
//staticProps//
//-----------//

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      description: episode.description,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: episode.file.duration,
      durationAsString: converDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}

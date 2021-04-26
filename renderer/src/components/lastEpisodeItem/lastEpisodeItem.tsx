import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  EpisodeContainer,
  EpisodeDetails,
  EpisodeMembers,
  EpisodeThumbnail,
  EpisodeTime,
  EpisodeTitle,
} from './style'

interface lastEpisodeItemProps {
  onPlayHandle: (episodeLis: episodeInteface[], index: number) => void
  episode: episodeInteface
  episodeList: episodeInteface[]
  index: number
}

interface episodeInteface {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: string
  durationAsString: string
  url: string
}

const LastEpisodeItem: React.FC<lastEpisodeItemProps> = ({
  episode,
  onPlayHandle,
  episodeList,
  index,
}) => {
  return (
    <EpisodeContainer>
      <EpisodeThumbnail>
        <Image
          width={192}
          height={192}
          objectFit={'cover'}
          src={episode.thumbnail}
          alt={episode.title}
        />
      </EpisodeThumbnail>
      <EpisodeDetails>
        <Link href={`/episode/${episode.id}`}>
          <EpisodeTitle>{episode.title}</EpisodeTitle>
        </Link>
        <EpisodeMembers>{episode.members}</EpisodeMembers>
        <EpisodeTime>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </EpisodeTime>
      </EpisodeDetails>
      <button type={'button'} onClick={() => onPlayHandle(episodeList, index)}>
        <img src="/play-green.svg" alt="Tocar episódio" />
      </button>
    </EpisodeContainer>
  )
}

export default LastEpisodeItem

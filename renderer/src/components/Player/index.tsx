import React, { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import Image from 'next/image'
import styles from './styles.module.scss'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { converDurationToTimeString } from '../../utils/converDurationToTimeString'

interface PlayerProps {
  bottom?: boolean
}

export const Player: React.FC<PlayerProps> = ({ bottom }) => {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    setPlayingState,
    hasNext,
    hasPrevious,
    clearPlayerState,
  } = usePlayer()

  const audioRef = useRef<HTMLAudioElement>(null)
  const episode = episodeList[currentEpisodeIndex]

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }, [isPlaying])

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  const handleEpisodeEnded = () => {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  return (
    <div className={`${styles.playerContainer} ${bottom ? styles.bottomMode : ''}`}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={192}
            height={192}
            src={episode.thumbnail}
            objectFit={'cover'}
          />
          <div className={styles.currentEpisodeDetails}>
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{converDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={Number(episode.duration)}
                value={progress}
                onChange={handleSeek}
                trackStyle={{
                  backgroundColor: '#04d361',
                }}
                railStyle={{
                  backgroundColor: '#9f75FF',
                }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>
            {episode
              ? converDurationToTimeString(Number(episode.duration))
              : '00:00:00'}
          </span>
        </div>

        {episode && (
          <audio
            loop={isLooping}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={() => setupProgressListener()}
            onEnded={handleEpisodeEnded}
            ref={audioRef}
            src={episode.url}
            autoPlay
          />
        )}

        <div className={styles.buttons}>
          <button
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
            type="button"
            disabled={!episode}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            onClick={playPrevious}
            type="button"
            disabled={!episode || !hasPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            disabled={!episode}
            className={styles.playButton}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button
            onClick={playNext}
            type="button"
            disabled={!episode || !hasNext}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
            type="button"
            disabled={!episode}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}

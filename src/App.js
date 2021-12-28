/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import './App.css'
import { getHomeList, getMovieInfo } from './Tmbd'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(true)

  useEffect(() => {
    const loadAll = async () => {
      //Get total list
      let movieList = await getHomeList()
      setMovieList(movieList)

      //Get featured
      let originals = movieList.filter(item => item.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]

      let movieChosenInfo = await getMovieInfo(chosen.id, 'tv')
      setFeaturedData(movieChosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  })

  return (
    <div className='page'>
      <Header black={blackHeader} />
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))
        }
      </section>
      <footer>
        Feito com <span role='img' aria-label='coracao'>❤ por Rodrigo Ruy Oliveira</span><br />
        Direitos de imagem para Netflix<br />
        Dados obtidos do site Themoviedb.org
      </footer>

      {
        movieList.length <= 0 &&
          <div className='loading'>
            <img src='/images/netflix_loadtime.gif' alt='loading' />
          </div>
      }
      </div>
  )
}
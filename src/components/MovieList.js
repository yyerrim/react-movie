import { useRef } from 'react';
import styles from './MovieList.module.css';
import { useState } from 'react';

const MovieList = () => {
  const search = useRef();
  const [movieList, setMovieList] = useState([]);

  const handleClick = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=cba95d401a14ab806ffc13a5052aab89&query=${search.current.value}`;
    const res = await fetch(url);
    const data = await res.json();
    setMovieList(data.results); // 데이터가 바껴서 렌더링이 새로 됨
  };

  return (
    <div className={styles.movie}>
      <h1>영화 검색</h1>
      <div className={styles.search_box}>
        <input
          type="text"
          placeholder="영화 제목을 검색하세요"
          ref={search}
        />
        <button onClick={handleClick}>
          검색
        </button>
      </div>
      <ul className={styles.list}>
        {
          movieList.map((v) => {
            return (
              <li>
                <img src={`https://image.tmdb.org/t/p/w185${v.poster_path}`}
                />
                <h2>{v.original_title}</h2>
                <p>평점 : {v.vote_average}</p>
                <p>개봉일 : {v.release_date}</p>
                <p>{v.overview}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default MovieList;
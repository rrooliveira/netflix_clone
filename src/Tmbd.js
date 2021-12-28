const API_KEY = "";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const req = await fetch(
    `${API_BASE}${endpoint}language=pt-BR&api_key=${API_KEY}`
  );
  const json = await req.json();

  return json;
};

async function getHomeList() {
  return [
    {
      slug: "originals",
      title: "Originais da Netflix",
      items: await basicFetch(`/discover/tv?with_network=213&`),
    },
    {
      slug: "trending",
      title: "Recomendados para Você",
      items: await basicFetch(`/trending/all/week?`),
    },
    {
      slug: "toprated",
      title: "Em alta",
      items: await basicFetch(`/movie/top_rated?`),
    },
    {
      slug: "action",
      title: "Ação",
      items: await basicFetch(`/discover/movie?with_genres=28&`),
    },
    {
      slug: "comedy",
      title: "Comedies",
      items: await basicFetch(`/discover/movie?with_genres=35&`),
    },
    {
      slug: "horror",
      title: "Terror",
      items: await basicFetch(`/discover/movie?with_genres=27&`),
    },
    {
      slug: "romance",
      title: "Romance",
      items: await basicFetch(`/discover/movie?with_genres=10749&`),
    },
    {
      slug: "documentary",
      title: "Documentário",
      items: await basicFetch(`/discover/movie?with_genres=99&`),
    },
  ];
}

async function getMovieInfo(idMovie, type) {
    let info = {};

    if (idMovie) {
        switch (type) {
            case "movie":
                info = await basicFetch(`/movie/${idMovie}?`)
                break;
            case "tv":
                info = await basicFetch(`/tv/${idMovie}?`)
                break;
        default:
            info = {}
            break;
        }
    }

  return info;
}

export { getHomeList, getMovieInfo };

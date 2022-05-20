export const genresList = [
  {
    name: 'Action',
    id: 28
  },
  {
    name: 'Adventure',
    id: 12,
  },
  {
    name: 'Animation',
    id: 16
  },
  {
    name: 'Comedy',
    id: 35,
  },
  {
    name: 'Crime',
    id: 80,
  },
  {
    name: "Family",
    id: 10751,
  },
  {
    name: 'Fantasy',
    id: 14,
  },
  {
    name: 'Horror',
    id: 27,
  },
  {
    name: 'Science Fiction',
    id: 878,
  },
  {
    name: 'Thriller',
    id: 53,
  },
]


const isGenre = (movie, genre) => {
  const { movieDetails: { genres: movieGenres } } = movie
  for(let i = 0; i < movieGenres.length; i++){
    if(movieGenres[i].id === genre.id){
      return true
    }
  }
  return false
}

export const useFilterGenre = (array, genre) => {
  if(!array || !genre){
    return array
  }
  return array.filter(item => isGenre(item, genre))
}
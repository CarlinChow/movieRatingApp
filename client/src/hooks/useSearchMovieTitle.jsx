export const useSearchMovieTitle = (data, searchQuery) => {
  if(!data){
    return []
  }
  if(!searchQuery){
    return []
  }
  return data.filter(item => item.movieDetails.title.toLowerCase().includes(searchQuery))
}
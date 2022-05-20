export const sortMethodsList = [
  {
    name: "Alphabetically",
    id: 1,
  },
  {
    name: "Ratings",
    id: 2,
  },
  {
    name: "Release Date",
    id: 3,
  },
]

//  compare function for sorting alphabetically A-Z
const compareAlpha = (movieA, movieB) => {
  const { movieDetails: { title: A }} = movieA
  const { movieDetails: { title: B }} = movieB
  let titleA = A
  let titleB = B

  if(titleA.toLowerCase().startsWith('the ')){
    titleA = titleA.slice(4, titleA.length)
  }
  if(titleB.toLowerCase().startsWith('the ')){
    titleB = titleB.slice(4, titleB.length)
  }

  if(titleB < titleA){
    return 1
  }
  if(titleB > titleA){
    return -1
  }
  return 0
}

// compare function for ratings sorted in descending order ie.( highest -> lowest )
const compareRatings = (movieA, movieB) => {
  const { ratings: ratingsA, movieDetails: { vote_average: voteA }} = movieA
  const { ratings: ratingsB, movieDetails: { vote_average: voteB }} = movieB
  let compareMetricA = voteA
  let compareMetricB = voteB

  if(ratingsA){
    compareMetricA = ratingsA
  }
  if(ratingsB){
    compareMetricB = ratingsB
  }

  if(compareMetricB < compareMetricA){
    return -1
  }
  if(compareMetricB > compareMetricA){
    return 1
  }
  return 0
}

//  compare function for release date, sorted in ascending order ie. ( oldest -> newest )
const compareRelease = (movieA, movieB) => {
  const { movieDetails: { release_date: release_dateA } } = movieA 
  const { movieDetails: { release_date: release_dateB } } = movieB

  const releaseYearA = parseInt(release_dateA.slice(0,4))
  const releaseYearB = parseInt(release_dateB.slice(0,4))

  if(releaseYearA < releaseYearB){
    return -1
  }
  if(releaseYearA > releaseYearB){
    return 1
  }
  return 0
}

export const useSortMovies = (method, array, reverse) => {
  if(!array || !method || method.id === -1){
    return array
  }
  if(method.id === 1){
    if(reverse){
      return [...array].sort(compareAlpha).reverse()
    }
    return [...array].sort(compareAlpha)
  }

  if(method.id === 2){
    if(reverse){
      return [...array].sort(compareRatings).reverse()
    }
    return [...array].sort(compareRatings)
  }

  if(method.id === 3){
    if(reverse){
      return [...array].sort(compareRelease).reverse()
    }
    return [...array].sort(compareRelease)
  }
}

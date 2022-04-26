import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/movies',
    prepareHeaders: (headers, {getState}) => {
      const token = getState().auth.token
      if(token){
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Movie'],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => '/', 
      providesTags: ['Movie'],
    }),
    getPopularMovies: builder.query({
      query: (page = 1) => `/popular/${page}`,
    }),
    getRecommendedMovies: builder.query({
      query: (id, page = 1) => `/recommend/${id}/${page}`
    }),
    getSearchedMovies: builder.query({
      query: (query, page = 1) => `/search/${query}/${page}`
    }),
    getUpcomingMovies: builder.query({
      query: (page = 1) => `/upcoming/${page}`,
    }),
    postMovie: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Movie'],
    }),
    postMovieByID: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Movie'],
    }),
    postReview: builder.mutation({
      query: (data, id) => ({
        url: `/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Movie'],
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Movie']
    })
  })
})

export const {
  useGetMoviesQuery,
  useGetPopularMoviesQuery,
  useGetRecommendedMoviesQuery,
  useGetSearchedMoviesQuery,
  useGetUpcomingMoviesQuery,
  usePostMovieMutation,
  usePostMovieByIDMutation, 
  usePostReviewMutation,
} = moviesApi
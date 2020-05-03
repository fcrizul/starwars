import { getFavorites, isFavorite } from '../api/database'

const API_URL = 'http://swapi.dev/api/people'

export const getPeople = async (isFav, url) => {
  if (url == null)
    url = API_URL
  console.log(url)

  var fav = []
  console.log(isFav)
  if (isFav) {
    fav = await getFavorites()
  }
  return fetch(url, { timeout: 60 * 1000 })
    .then(res => res.json())
    .then(response => {
      if (isFav) {
        var result = response.results.filter(item => fav.some(itemFav => item.url.includes("/people/" + itemFav + "/")));
        response.results = result
      }
      return response
    })
    .catch(error => {
      console.error(error);
    });
}

export const getPerson = (url) => {
  console.log(url)
  return fetch(url, { timeout: 60 * 1000 })
    .then(res => res.json())
    .then(response => response)
    .catch(error => {
      console.error(error);
    });
}
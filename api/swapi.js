const API_URL = 'https://swapi.dev/api/people'

export const getPeople= (url) => {
  if (url == null)
    url = API_URL
  console.log(url)
  return fetch(url,{timeout: 60 * 1000})
    .then(res => res.json())
    .then(response => response)
    .catch(error => {
      console.error(error);
    });
}

export const getPerson= (url) => {
  console.log(url)
  return fetch(url,{timeout: 60 * 1000})
    .then(res => res.json())
    .then(response =>response)
    .catch(error => {
      console.error(error);
    });
}
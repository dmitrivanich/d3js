import ky from "ky"

export default async function getWordsFromServer(number) {
  return await ky.get("https://random-word-api.herokuapp.com/word?number=" + number).json()
}


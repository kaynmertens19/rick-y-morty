let page = 1;
const url = 'https://rickandmortyapi.com/api'
export const urlCharacters = `${url}/character`
export const urlEpisodes = `${url}/episode`
const urlLocations = `${url}/location`

import { Episode } from "../types/episodes.js";
import { Character } from "../types/characters.js";
import { Location } from "../types/locations.js";
import { init } from "../main.js";



export async function getEpisodes(): Promise<Episode[]> {
  const response = await fetch(urlEpisodes + `?page=${page}`)
  console.log(urlEpisodes)
  const data = await response.json()
  return data.results
}

export async function getCharacters(): Promise<Character[]> {
  const response = await fetch(urlCharacters)
  const data = await response.json();
  return data.results
}

export async function getLocations(): Promise<Location[]> {
  const response = await fetch(urlLocations)
  const data = await response.json()
  return data.results
}


const nextButton = document.querySelector("#load-more");
const previusButton = document.querySelector("#load-minus")
nextButton?.addEventListener("click", next)
previusButton?.addEventListener("click", previus)


function esconderBotones(){
if (page === 1){
  nextButton?.classList.add("displayBlock")
  previusButton?.classList.add("displayNone")
  nextButton?.classList.remove("displayNone")
  previusButton?.classList.remove("displayBlock")
}else if (page === 2){
  nextButton?.classList.add("displayBlock")
  previusButton?.classList.add("displayBlock")
  nextButton?.classList.remove("displayNone")
  previusButton?.classList.remove("displayNone")

}else if (page === 3){
  nextButton?.classList.add("displayNone")
  previusButton?.classList.add("displayBlock")
  nextButton?.classList.remove("displayBlock")
  previusButton?.classList.remove("displayNone")
}
}


function next(){
  page++
  console.log(page)
  const cageEpisodes = document.querySelector('#ulEpisodes')
  if (cageEpisodes){
    cageEpisodes.innerHTML = ""
  }
  getEpisodes()
  init()
esconderBotones()
}

function previus(){
  page--
  console.log(page)
  const cageEpisodes = document.querySelector('#ulEpisodes')
  if (cageEpisodes){
    cageEpisodes.innerHTML = ""
  }
  getEpisodes()
  init()
esconderBotones()
}
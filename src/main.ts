import { Episode } from './types/episodes.js'
import { getEpisodes, getLocations } from './utils/API.js'

window.addEventListener('load', init)
// function to print the list of episodes when the page is loaded
export async function init() {
  const cageEpisodes = document.querySelector('#ulEpisodes')
  const episodes = await getEpisodes()

  episodes.forEach((episode) => {
    const liEpisodes = document.createElement('a')
    liEpisodes.className = 'nav-item'
    liEpisodes.id = 'liEpisodes'
    liEpisodes.href = '#' + episode.id
    
    const svgEpisodes = document.createElement('svg')
    svgEpisodes.className = 'bi pe-none me-2'
    svgEpisodes.style.width = '20px'
    svgEpisodes.style.height = '20px'
    const aEpisodes = document.createElement('a')
    aEpisodes.id = episode.id
    const aEpisodesText = document.createTextNode(episode.name)
    aEpisodes.style.fontSize = '1.3em'
    const hrEpisodes = document.createElement('hr')
    hrEpisodes.style.width = '20em'
    hrEpisodes.style.marginLeft = '1em'

    cageEpisodes?.appendChild(liEpisodes)
    cageEpisodes?.appendChild(hrEpisodes)
    liEpisodes.appendChild(svgEpisodes)

    svgEpisodes.appendChild(aEpisodes)
    aEpisodes.appendChild(aEpisodesText)

    liEpisodes.addEventListener('click', () => {
      showPj(episode)
    })
  })
}
// function to load the information and fetch the characters that appears on one episode when you click on them.
function showPj(episode: Episode) {
  const episodeChars = episode.characters
  const contenedorCard = document.querySelector('#contenedorCard')
  if (contenedorCard) {
    contenedorCard.innerHTML = ''

    const h1Episode = document.createElement('h1')
    h1Episode.textContent = episode.name
    h1Episode.className = 'h1Episode'
    h1Episode.id = episode.id

    let divRow = document.createElement('div')
    divRow.className = 'row row-cols-4'
    divRow.id = 'divRow'

    const h2Episode = document.createElement('h2')
    h2Episode.textContent = episode.air_date + ' / ' + episode.episode
    h2Episode.className = 'h2Episode'
    contenedorCard?.appendChild(h1Episode)
    contenedorCard?.appendChild(h2Episode)
    contenedorCard?.appendChild(divRow)
  } else {
    console.log('missing contenedor')
  }
  episodeChars.forEach((char) => {
    const fetchChar = fetch(char)
    imprimirPersonajes(fetchChar, episode) //
  })
}
// function to print that characters in the screen
async function imprimirPersonajes(fetchChar: Promise<Response>, episode: Episode) {
  const contenedorCard = document.querySelector('#contenedorCard')
  const result = await fetchChar
  const data = await result.json()
  if (contenedorCard) {
    let divCol = document.createElement('div')
    divCol.className = 'col'
    divCol.id = data.id + 'n'
    let divCard = document.createElement('div')
    divCard.style.width = '18rem'
    let imgDivCard = document.createElement('img')
    imgDivCard.className = 'card-img-top'
    imgDivCard.src = data.image
    let cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    let h5CardBody = document.createElement('h5')
    h5CardBody.className = 'card-title'
    h5CardBody.textContent = data.name
    let pCardBody1 = document.createElement('p')
    pCardBody1.className = 'card-text'
    let divRow = document.querySelector('#divRow')

    divRow?.appendChild(divCol)
    divCol.appendChild(divCard)
    divCard.appendChild(imgDivCard)
    divCard.appendChild(cardBody)
    cardBody.appendChild(h5CardBody)
    cardBody.appendChild(pCardBody1)

    // function to display the modal when you clickmin one character
    const openModalImg = document.getElementById(`${data.id}n`)
    const modalImg = document.querySelector('.modalImg')
    const closeModalImg = document.querySelector('.modal__closeImg')
    const bodyMainInfo = document.querySelector('.body_mainInfo')

    openModalImg!.addEventListener('click', (e) => {
      e.preventDefault()
      modalImg!.classList.add('modalImg--show')
      getLocation()
      async function getLocation() {
        const locations = await getLocations()
        locations.forEach((location) => {

        })
        printModalInfo(location, openModalImg, data, bodyMainInfo, episode, closeModalImg, modalImg)
      }
    })

    closeModalImg!.addEventListener('click', (e) => {
      e.preventDefault()
      modalImg!.classList.remove('modalImg--show')
      bodyMainInfo!.innerHTML = ''
    })
  } else {
    console.log('missing contenedor')
  }
}

// function to print the info on the modal
function printModalInfo(
  location: any,
  openModalImg: any,
  data: any,
  bodyMainInfo: any,
  episode: Episode,
  closeModalImg : any,
  modalImg: any 
) {
  if (openModalImg) {
    console.log(location)
    // Header part-----------------------
    const informationFlex = document.createElement('div')
    informationFlex.className = 'information_flex'
    const bodyEpisodeInfo = document.createElement('div')
    bodyEpisodeInfo.className = 'body_episodeInfo'

    const modalImg = document.createElement('img')
    modalImg.src = data.image
    console.log(modalImg)
    modalImg.alt = data.name + 'image'
    modalImg.className= "gilipollas"
    const modalTittle = document.createElement('h2')
    modalTittle.textContent = data.name
    const modalInfo = document.createElement('p')
    modalInfo.textContent =
      data.species + ' / ' + data.status + ' / ' + data.gender + ' / '
    const modalSpan = document.createElement('span')
    const modalSpanA = document.createElement('a')
    modalSpanA.textContent = location.name + ' ' + location.dimension
    bodyMainInfo?.appendChild(modalImg)
    bodyMainInfo?.appendChild(informationFlex)

    informationFlex.appendChild(modalTittle)
    informationFlex.appendChild(modalInfo)
    modalInfo.appendChild(modalSpan)
    modalSpan.appendChild(modalSpanA)

    const episodesUrl = data.episode
    episodesUrl.forEach((episodesUrl: any) => {
      const fetchEp = fetch(episodesUrl)
      imprimirEp(fetchEp, openModalImg, episode,closeModalImg,  modalImg, bodyMainInfo ) //
    })
  }
}


// function to print the episodes in wich the characters appears
async function imprimirEp(fetchEp: any, openModalImg: any, episode: Episode, closeModalImg : any,  modalImg: any,bodyMainInfo: any ) {

  const bodyEpisodeInfo = document.querySelector(".body_episodeInfo")
  bodyEpisodeInfo!.innerHTML = ""
  const result = await fetchEp;
  const data = await result.json();
  const ulEpisodesPj = document.createElement('ul');
  const liEpisodesPj = document.createElement('li');
  bodyEpisodeInfo!.appendChild(ulEpisodesPj);
  bodyEpisodeInfo!.classList.add("size2")
  ulEpisodesPj.appendChild(liEpisodesPj);
  liEpisodesPj.textContent = data.name;
  liEpisodesPj.id = "liEpisodes"
}
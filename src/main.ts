import { getEpisodes, } from './utils/API.js'

window.addEventListener('load', init)

export async function init() {
  const cageEpisodes = document.querySelector('#ulEpisodes')
  const episodes = await getEpisodes()

  episodes.forEach((episodes) => {

    const liEpisodes = document.createElement('li')
    liEpisodes.className = 'nav-item'
    liEpisodes.id = "liEpisodes";
    const svgEpisodes = document.createElement('svg')
    svgEpisodes.className = 'bi pe-none me-2'
    svgEpisodes.style.width = '20px'
    svgEpisodes.style.height = '20px'
    const aEpisodes = document.createElement('a')
    aEpisodes.id = episodes.id
    const aEpisodesText = document.createTextNode(episodes.name)
    aEpisodes.style.fontSize = "1.3em"
    const hrEpisodes = document.createElement('hr')
    hrEpisodes.style.width = '15vw'
    hrEpisodes.style.marginLeft = "1vw"

    cageEpisodes?.appendChild(liEpisodes)
    cageEpisodes?.appendChild(hrEpisodes) 
    liEpisodes.appendChild(svgEpisodes)
    
    svgEpisodes.appendChild(aEpisodes)
    aEpisodes.appendChild(aEpisodesText)

    liEpisodes.addEventListener('click', showPj)

 
  


   

 function showPj() {
        const episodeChars = episodes.characters
        const contenedorCard = document.querySelector("#contenedorCard");
        if (contenedorCard){
        contenedorCard.innerHTML = ""

        const h1Episode = document.createElement('h1');
        h1Episode.textContent = episodes.name;
        h1Episode.className = "h1Episode"
    
        let divRow = document.createElement("div");
        divRow.className = "row row-cols-4"
        divRow.id = "divRow";

        const h2Episode = document.createElement("h2");
              h2Episode.textContent = episodes.airDate + " / " + episodes.episodeCode;
              h2Episode.className = "h2Episode"
              contenedorCard?.appendChild(h1Episode);
              contenedorCard?.appendChild(h2Episode);
              contenedorCard?.appendChild(divRow);
        }    else{
          console.log("missing contenedor");
        }
      episodeChars.forEach((char) => {
       const fetchChar =  fetch(char);
       imprimirPersonajes() //
        async function imprimirPersonajes(){
          
          const result = await fetchChar;
          const data = await result.json();
          if (contenedorCard){
      
          
              let divCol = document.createElement("div");
              divCol.className = "col";
              divCol.setAttribute("data-bs-toggle", "modal");
              divCol.setAttribute("data-bs-target", "modal");
              let divCard = document.createElement("div");
              divCard.style.width = "18rem";
              let imgDivCard = document.createElement("img");
              imgDivCard.className = "card-img-top"
              imgDivCard.src = data.image;
              let cardBody = document.createElement("div");
              cardBody.className = "card-body"
              let h5CardBody = document.createElement("h5")
              h5CardBody.className = "card-title"
              h5CardBody.textContent = data.name;
              let pCardBody1 = document.createElement("p");
              pCardBody1.className = "card-text"
              pCardBody1.textContent = data.status + " / " + data.species;
            let divRow = document.querySelector("#divRow");
              
              divRow?.appendChild(divCol);
              divCol.appendChild(divCard);
              divCard.appendChild(imgDivCard);
              divCard.appendChild(cardBody);
              cardBody.appendChild(h5CardBody);
              cardBody.appendChild(pCardBody1);

          
          }
          else{
            console.log("missing contenedor");
          }

        }
      })

    }

   
  })



}


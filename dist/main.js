var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes, getLocations } from './utils/API.js';
window.addEventListener('load', init);
export function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const cageEpisodes = document.querySelector('#ulEpisodes');
        const episodes = yield getEpisodes();
        episodes.forEach((episode) => {
            const liEpisodes = document.createElement('a');
            liEpisodes.className = 'nav-item';
            liEpisodes.id = 'liEpisodes';
            liEpisodes.href = '#' + episode.id;
            const svgEpisodes = document.createElement('svg');
            svgEpisodes.className = 'bi pe-none me-2';
            svgEpisodes.style.width = '20px';
            svgEpisodes.style.height = '20px';
            const aEpisodes = document.createElement('a');
            aEpisodes.id = episode.id;
            const aEpisodesText = document.createTextNode(episode.name);
            aEpisodes.style.fontSize = '1.3em';
            const hrEpisodes = document.createElement('hr');
            hrEpisodes.style.width = '20em';
            hrEpisodes.style.marginLeft = '1em';
            cageEpisodes === null || cageEpisodes === void 0 ? void 0 : cageEpisodes.appendChild(liEpisodes);
            cageEpisodes === null || cageEpisodes === void 0 ? void 0 : cageEpisodes.appendChild(hrEpisodes);
            liEpisodes.appendChild(svgEpisodes);
            svgEpisodes.appendChild(aEpisodes);
            aEpisodes.appendChild(aEpisodesText);
            liEpisodes.addEventListener('click', () => {
                showPj(episode);
            });
        });
    });
}
function showPj(episode) {
    const episodeChars = episode.characters;
    const contenedorCard = document.querySelector('#contenedorCard');
    if (contenedorCard) {
        contenedorCard.innerHTML = '';
        const h1Episode = document.createElement('h1');
        h1Episode.textContent = episode.name;
        h1Episode.className = 'h1Episode';
        h1Episode.id = episode.id;
        let divRow = document.createElement('div');
        divRow.className = 'row row-cols-4';
        divRow.id = 'divRow';
        const h2Episode = document.createElement('h2');
        h2Episode.textContent = episode.air_date + ' / ' + episode.episode;
        h2Episode.className = 'h2Episode';
        contenedorCard === null || contenedorCard === void 0 ? void 0 : contenedorCard.appendChild(h1Episode);
        contenedorCard === null || contenedorCard === void 0 ? void 0 : contenedorCard.appendChild(h2Episode);
        contenedorCard === null || contenedorCard === void 0 ? void 0 : contenedorCard.appendChild(divRow);
    }
    else {
        console.log('missing contenedor');
    }
    episodeChars.forEach((char) => {
        const fetchChar = fetch(char);
        imprimirPersonajes(fetchChar, episode);
    });
}
function imprimirPersonajes(fetchChar, episode) {
    return __awaiter(this, void 0, void 0, function* () {
        const contenedorCard = document.querySelector('#contenedorCard');
        const result = yield fetchChar;
        const data = yield result.json();
        if (contenedorCard) {
            let divCol = document.createElement('div');
            divCol.className = 'col';
            divCol.id = data.id + 'n';
            let divCard = document.createElement('div');
            divCard.style.width = '18rem';
            let imgDivCard = document.createElement('img');
            imgDivCard.className = 'card-img-top';
            imgDivCard.src = data.image;
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            let h5CardBody = document.createElement('h5');
            h5CardBody.className = 'card-title';
            h5CardBody.textContent = data.name;
            let pCardBody1 = document.createElement('p');
            pCardBody1.className = 'card-text';
            let divRow = document.querySelector('#divRow');
            divRow === null || divRow === void 0 ? void 0 : divRow.appendChild(divCol);
            divCol.appendChild(divCard);
            divCard.appendChild(imgDivCard);
            divCard.appendChild(cardBody);
            cardBody.appendChild(h5CardBody);
            cardBody.appendChild(pCardBody1);
            const openModalImg = document.getElementById(`${data.id}n`);
            const modalImg = document.querySelector('.modalImg');
            const closeModalImg = document.querySelector('.modal__closeImg');
            const bodyMainInfo = document.querySelector('.body_mainInfo');
            openModalImg.addEventListener('click', (e) => {
                e.preventDefault();
                modalImg.classList.add('modalImg--show');
                getLocation();
                function getLocation() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const locations = yield getLocations();
                        locations.forEach((location) => {
                        });
                        printModalInfo(location, openModalImg, data, bodyMainInfo, episode, closeModalImg, modalImg);
                    });
                }
            });
            closeModalImg.addEventListener('click', (e) => {
                e.preventDefault();
                modalImg.classList.remove('modalImg--show');
                bodyMainInfo.innerHTML = '';
            });
        }
        else {
            console.log('missing contenedor');
        }
    });
}
function printModalInfo(location, openModalImg, data, bodyMainInfo, episode, closeModalImg, modalImg) {
    if (openModalImg) {
        console.log(location);
        const informationFlex = document.createElement('div');
        informationFlex.className = 'information_flex';
        const bodyEpisodeInfo = document.createElement('div');
        bodyEpisodeInfo.className = 'body_episodeInfo';
        const modalImg = document.createElement('img');
        modalImg.src = data.image;
        console.log(modalImg);
        modalImg.alt = data.name + 'image';
        modalImg.className = "gilipollas";
        const modalTittle = document.createElement('h2');
        modalTittle.textContent = data.name;
        const modalInfo = document.createElement('p');
        modalInfo.textContent =
            data.species + ' / ' + data.status + ' / ' + data.gender + ' / ';
        const modalSpan = document.createElement('span');
        const modalSpanA = document.createElement('a');
        modalSpanA.textContent = location.name + ' ' + location.dimension;
        bodyMainInfo === null || bodyMainInfo === void 0 ? void 0 : bodyMainInfo.appendChild(modalImg);
        bodyMainInfo === null || bodyMainInfo === void 0 ? void 0 : bodyMainInfo.appendChild(informationFlex);
        informationFlex.appendChild(modalTittle);
        informationFlex.appendChild(modalInfo);
        modalInfo.appendChild(modalSpan);
        modalSpan.appendChild(modalSpanA);
        const episodesUrl = data.episode;
        episodesUrl.forEach((episodesUrl) => {
            const fetchEp = fetch(episodesUrl);
            imprimirEp(fetchEp, openModalImg, episode, closeModalImg, modalImg, bodyMainInfo);
        });
    }
}
function imprimirEp(fetchEp, openModalImg, episode, closeModalImg, modalImg, bodyMainInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyEpisodeInfo = document.querySelector(".body_episodeInfo");
        bodyEpisodeInfo.innerHTML = "";
        const result = yield fetchEp;
        const data = yield result.json();
        const ulEpisodesPj = document.createElement('ul');
        const liEpisodesPj = document.createElement('li');
        bodyEpisodeInfo.appendChild(ulEpisodesPj);
        bodyEpisodeInfo.classList.add("size2");
        ulEpisodesPj.appendChild(liEpisodesPj);
        liEpisodesPj.textContent = data.name;
        liEpisodesPj.id = "liEpisodes";
    });
}

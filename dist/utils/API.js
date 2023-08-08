var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let page = 1;
const url = 'https://rickandmortyapi.com/api';
export const urlCharacters = `${url}/character`;
export const urlEpisodes = `${url}/episode`;
const urlLocations = `${url}/location`;
import { init } from "../main.js";
export function getEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlEpisodes + `?page=${page}`);
        console.log(urlEpisodes);
        const data = yield response.json();
        return data.results;
    });
}
export function getCharacters() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlCharacters);
        const data = yield response.json();
        return data.results;
    });
}
export function getLocations() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlLocations);
        const data = yield response.json();
        return data.results;
    });
}
const nextButton = document.querySelector("#load-more");
const previusButton = document.querySelector("#load-minus");
nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener("click", next);
previusButton === null || previusButton === void 0 ? void 0 : previusButton.addEventListener("click", previus);
function esconderBotones() {
    if (page === 1) {
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.classList.add("displayBlock");
        previusButton === null || previusButton === void 0 ? void 0 : previusButton.classList.add("displayNone");
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.classList.remove("displayNone");
        previusButton === null || previusButton === void 0 ? void 0 : previusButton.classList.remove("displayBlock");
    }
    else if (page === 2) {
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.classList.add("displayBlock");
        previusButton === null || previusButton === void 0 ? void 0 : previusButton.classList.add("displayBlock");
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.classList.remove("displayNone");
        previusButton === null || previusButton === void 0 ? void 0 : previusButton.classList.remove("displayNone");
    }
    else if (page === 3) {
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.classList.add("displayNone");
        previusButton === null || previusButton === void 0 ? void 0 : previusButton.classList.add("displayBlock");
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.classList.remove("displayBlock");
        previusButton === null || previusButton === void 0 ? void 0 : previusButton.classList.remove("displayNone");
    }
}
function next() {
    page++;
    console.log(page);
    const cageEpisodes = document.querySelector('#ulEpisodes');
    if (cageEpisodes) {
        cageEpisodes.innerHTML = "";
    }
    getEpisodes();
    init();
    esconderBotones();
}
function previus() {
    page--;
    console.log(page);
    const cageEpisodes = document.querySelector('#ulEpisodes');
    if (cageEpisodes) {
        cageEpisodes.innerHTML = "";
    }
    getEpisodes();
    init();
    esconderBotones();
}

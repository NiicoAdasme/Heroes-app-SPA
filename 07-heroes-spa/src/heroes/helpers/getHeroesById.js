import { heroes } from "../data/"

export const getHeroesById = (id) => {

    return heroes.find( heroe => heroe.id === id);

}
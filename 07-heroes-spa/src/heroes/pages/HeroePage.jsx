import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroesById } from "../helpers";

export const HeroePage = () => {

    const {id} = useParams();

    const hero = useMemo( () => getHeroesById(id), [id])

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)
    }

    if( !hero ){
        return <Navigate to='/marvel' />
    }

    return (
        <div className="row mt-5 animate__animated animate__fadeInLeft">
            <div className="col-4">
                <img 
                    src={`/src/assets/heroes/${id}.jpg`} 
                    alt={hero.superhero}
                    className="img-thumbnail "
                />
            </div>

            <div className="col-8">
                <h3>{hero.superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b>Alter ego: </b> {hero.alter_ego} </li>
                    <li className="list-group-item"> <b>Publisher: </b> {hero.publisher} </li>
                    <li className="list-group-item"> <b>First appearance: </b> {hero.first_appearance} </li>
                </ul>

                <h5 className="mt-3"> characters</h5>
                <p>{hero.characters}</p>

                <button className="btn btn-outline-secondary" onClick={handleBack}>
                    Back
                </button>
            </div>
        </div>
    )
}

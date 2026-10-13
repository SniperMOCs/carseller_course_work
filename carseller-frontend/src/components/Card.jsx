import { useEffect, useState } from "react";
import http from "../http-common";
import { useNavigate } from "react-router-dom";

function Card({ad}) {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState("");
    
    useEffect(() => {
        const loadPhoto = async () => {
            if (ad.photos.length != 0){
                http.get(`/photos/${ad.photos[0].id}`)
                .then((response) => {
                    setPhoto(response.data);
                })
            }
            
        };
        loadPhoto();
    }, [ad.photos])
    

    return (
        <div className="card m-2 h-100 w-100" onClick = {() => navigate(`/ad/${ad.id}`)}>
            <div className="ratio ratio-16x9" >
                {photo === "" ? 
                (
                <div className="mb-3 d-flex justify-content-center align-items-center">
                    <label>
                        <div className="text-center">
                            <p className="text-secondary">Фото не найдены</p>
                        </div>
                    </label>
                </div>
                ) : (
                    <img src = {photo.file} className = "card-img-top object-fit-cover"/>
                )}
            </div>
            <div className = {`card-body border-top ${(ad.status != 'PUBLISHED' && ad.status != 'HIDDEN') && 'text-decoration-line-through text-muted'} ${(ad.status == 'HIDDEN') && 'text-muted'}`}>
                <h5 className ="card-title">{ad.car.brand.name} {ad.car.name}, {ad.year}</h5>
                <p className="card-text position-absolute bottom-0 mb-3">{new Intl.NumberFormat('ru-RU').format(ad.price)} ₽</p>
            </div>
        </div>
    )
}

export default Card;
import { useEffect, useState } from "react";
import http from "../../http-common";
import { Link, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Ads from "../../components/Ads";
import Carousel from "../../components/Carousel";
import DeleteBTN from "../../components/DeleteBTN";

function AdData({user}) {
    const { id } = useParams();

    const [car, setCar] = useState({name: "Модель"});
    const [year, setYear] = useState("2025");
    const [price, setPrice] = useState("0");
    const [mileage, setMileage] = useState("0");
    const [enginePower, setEnginePower] = useState("0");
    const [engineCC, setEngineCC] = useState("0");
    const [color, setColor] = useState("Белый");
    const [steeringPlacement, setSteeringPlacement] = useState("Слева");
    const [gearbox, setGearbox] = useState("АКПП");
    const [description, setDescription] = useState("Продам авто");
    const [brand, setBrand] = useState("Марка");

    const [status, setStatus] = useState("PUBLISHED");
    const [publisher, setPublisher] = useState("");

    const [chassisNumber, setChassisNumber] = useState("ABC123");
    const [fuelType, setFuelType] = useState("Бензин");
    
    const [photos, setPhotos] = useState([]);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    const [inFav, setInFav] = useState(false);

    useEffect(() => {
        http.get(`/ad/${id}`)
            .then((response) => {
                setChassisNumber(response.data.chassisNumber);
                setCar(response.data.car);
                setBrand(response.data.car.brand.name);
                setYear(response.data.year);
                setPrice(response.data.price);
                setMileage(response.data.mileage);
                setEnginePower(response.data.enginePower);
                setEngineCC(response.data.engineCC);
                setColor(response.data.color);
                setSteeringPlacement(translateSteering[response.data.steeringPlacement]);
                setGearbox(translateGearbox[response.data.gearbox]);
                setFuelType(translateFuel[response.data.fuelType]);
                setDescription(response.data.description);
                setPublisher(response.data.publisher);
                const soldAt = response.data.soldAt;
                if (soldAt != null){
                    setStatus("SOLD");
                }
                else{
                    setStatus(response.data.status);
                }
            })
        http.get(`/photos/ad=${id}`)
            .then((response) => {
                setPhotos(response.data);
            })
        http.get('/favorites')
            .then(response => {
                const data = response.data;
                if(data.find(ad => ad.id == id)){
                    setInFav(true);
                }
            })
        http.post("/history/add", null, { params: {adId: id}})
    }, [id])

    useEffect(() => {
        const main = photos[0];
        if (main != undefined){
            document.getElementById("photo_0").classList.add("active");
            setActivePhotoIndex(0);
        }
        
    }, [photos])

    const translateFuel = {
        "BENZINE": "Бензин",
        "DIESEL": "Дизель",
        "HYBRID": "Гибрид",
        "LPG": "ГБО"
    }

    const translateGearbox = {
        "MANUAL": "МКПП",
        "AUTOMATIC": "АКПП",
        "ROBOT": "Робот",
        "VARIATOR": "Вариатор"
    }

    const translateSteering = {
        "LEFT": "Слева",
        "RIGHT": "Справа"
    }

    const handleFav = () => {
        if (inFav){
            setInFav(false);
            http.post(`/favorites/delete/${id}`)
            .then(() => {
                setInFav(false);
            })
        }
        else{
            setInFav(true);
            http.post("/favorites/add", null, { params: {adId: id}})
            .then(() => {
                setInFav(true);
            })
        }
    }

    return (
        <div className="container-fluid">
                <div className="row" style={{maxWidth: "50%"}}>
                    <div className="col py-3">
                        <h1 className={`${(status != 'PUBLISHED' && status != 'HIDDEN') && 'text-decoration-line-through text-muted'} ${(status == 'HIDDEN') && 'text-muted'}`}>
                            {user != null && user.user.id != publisher.id && (
                                <span className={`bi fs-2 m-1 ${inFav ? 'bi-bookmark-star-fill' : 'bi-bookmark-star'}`} 
                                onClick={handleFav}>
                                </span>
                            )}
                            
                            {brand} {car.name}, {year}
                        </h1>
                        {user != null && (
                            <>
                            {user.user.id === publisher.id ? (
                                <>
                                <Link to={`/ad/update/${id}`} className="btn btn-primary me-2">Редактировать объявление</Link>
                                <DeleteBTN adId={id} currentStatus={status}></DeleteBTN>
                                </>
                            ) : (
                                <Link className="btn btn-primary" to={`/ad/${id}/newChat`}>Написать продавцу</Link>
                            )}
                            </>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                            <div>
                                {photos.length === 0 ? (
                                    <div className="ratio ratio-1x1">
                                        <div className="mb-3 border border-secondary rounded d-flex justify-content-center align-items-center">
                                        <label className="" style={{ cursor: "pointer" }}>
                                            <div className="text-center">
                                                <p className="text-secondary">Фото не найдены</p>
                                            </div>
                                        </label>
                                    </div>
                                    </div>
                                    ) : (
                                    <div id="carouselExample" className="carousel slide">
                                        <div className="carousel-inner">
                                            {photos.map((photo, index) =>(
                                                <div className="carousel-item" key={index} id={"photo_" + index} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setActivePhotoIndex(index)}>
                                                    <div className="ratio ratio-1x1">
                                                        <img src={photo.file} className="object-fit-cover border rounded" alt={photo.name}/>
                                                    </div>
                                                </div>
                                            ))}
                                                
                                        </div>
                                    {photos.length > 1 && (
                                        <>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </>
                                    )}
                                    
                                    
                                </div>)}
                            </div>
                            
                            
                            {photos.length > 0 && (
                                <div className="d-flex flex-wrap gap-2 my-2">
                                    {photos.map((photo, index) => (
                                                    <div 
                                                        key={photo.id} 
                                                        className="position-relative"
                                                        data-bs-target="#carouselExample"
                                                        data-bs-slide-to={index}
                                                        style={{ width: "70px", height: "70px" }}
                                                        onClick={() => setActivePhotoIndex(index)}
                                                        id={"miniature_" + index}
                                                    >
                                                        <img
                                                            src={photo.file}
                                                            className={`w-100 h-100 border rounded ${index === activePhotoIndex ? 'border-secondary' : 'border-secondary'}`}
                                                            style={{ objectFit: "cover", cursor: "pointer" }}
                                                            alt={`Миниатюра ${index + 1}`}
                                                        />
                                                    </div>
                                                ))}
                                </div>
                            )}
                    </div>
                    <div className="col">
                        <h1>{new Intl.NumberFormat('ru-RU').format(price)} ₽</h1>
                        <table className="table table-borderless" style={{maxWidth: '50%'}}>
                            <tbody>
                                <tr>
                                    <td className="text-muted ps-0">Двигатель</td>
                                    <td className="fw-medium">{fuelType}, {engineCC} л</td>
                                </tr>
                                <tr>
                                    <td className="text-muted ps-0">Мощность</td>
                                    <td className="fw-medium">{enginePower} л.с.</td>
                                </tr>
                                <tr>
                                    <td className="text-muted ps-0">Коробка передач</td>
                                    <td className="fw-medium">{gearbox}</td>
                                </tr>
                                <tr>
                                    <td className="text-muted ps-0">Цвет</td>
                                    <td className="fw-medium">{color}</td>
                                </tr>                                    
                                <tr>
                                    <td className="text-muted ps-0">Пробег</td>
                                    <td className="fw-medium">{mileage} км</td>
                                </tr>
                                <tr>
                                    <td className="text-muted ps-0">Руль</td>
                                    <td className="fw-medium">{steeringPlacement}</td>
                                </tr>
                                <tr>
                                    <td className="text-muted ps-0">Номер кузова</td>
                                    <td className="fw-medium">{chassisNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style={{maxWidth : '100%', whiteSpace: 'pre-wrap'}} >
                            <span className="text-muted ps-0">Описание: </span>
                            {description}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <Carousel endpoint="/history" caption="История просмотра"></Carousel>
                </div>
                {photos.length > 0 && (
                <div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-fullscreen">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex align-items-center justify-content-center">
                                    <img src={photos[activePhotoIndex].file} className="img-fluid mw-100 mh-100"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>

    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(AdData);
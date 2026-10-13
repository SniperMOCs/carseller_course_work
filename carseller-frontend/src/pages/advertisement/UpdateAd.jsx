import { useEffect, useState } from "react";
import http from "../../http-common";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

function UpdateAd({user}) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [carId, setCarId] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [mileage, setMileage] = useState("");
    const [enginePower, setEnginePower] = useState("");
    const [engineCC, setEngineCC] = useState("");
    const [color, setColor] = useState("");
    const [steeringPlacement, setSteeringPlacement] = useState("");
    const [gearbox, setGearbox] = useState("");
    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("PUBLISHED");
    const [publisher, setPublisher] = useState("");

    const [chassisNumber, setChassisNumber] = useState("");
    const [fuelType, setFuelType] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [cars, setCars] = useState([]);
    
    const [photos, setPhotos] = useState([]);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    useEffect(() => {
        http.get(`/ad/${id}`)
            .then((response) => {
                if (response.data.publisher.id != user.user.id){
                    navigate(-1);
                }
                setChassisNumber(response.data.chassisNumber);
                setCarId(response.data.car.id);
                setYear(response.data.year);
                setPrice(response.data.price);
                setMileage(response.data.mileage);
                setEnginePower(response.data.enginePower);
                setEngineCC(response.data.engineCC);
                setColor(response.data.color);
                setSteeringPlacement(response.data.steeringPlacement);
                setGearbox(response.data.gearbox);
                setFuelType(response.data.fuelType);
                setDescription(response.data.description);
                setPublisher(response.data.publisher);
            })
        getPhotos();
    }, [id])

    useEffect(() => {
        http.get("/cars")
            .then(response => {
                setCars(response.data);
            })
    }, [])

    useEffect(() => {
        const main = photos[0];
        if (main != undefined && document.getElementById('carouselExample')){
            document.getElementById("photo_0").classList.add("active");
            setActivePhotoIndex(0);
        }
        
    }, [photos])

    const handleChangeCar = (event) => {
        setCarId(event.target.value);
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleChangeMileage = (event) => {
        setMileage(event.target.value);
    };

    const handleChangePower = (event) => {
        setEnginePower(event.target.value);
    };

    const handleChangeCC = (event) => {
        setEngineCC(event.target.value);
    };

    const handleChangeColor = (event) => {
        setColor(event.target.value);
    };

    const handleChangeSteering = (event) => {
        setSteeringPlacement(event.target.value);
    };

    const handleChangeGearbox = (event) => {
        setGearbox(event.target.value);
    };

    const handleChangeChassis = (event) => {
        setChassisNumber(event.target.value);
    };

    const handleChangeFuel = (event) => {
        setFuelType(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const getPhotos = () => {
        http.get(`/photos/ad=${id}`)
            .then((response) => {
                setPhotos(response.data);
            })
    }

    const handleChangePhoto = (e) => {
        if (photos.length >= 70){
            return;
        }

        const data = new FormData();
        data.append('file', e.target.files[0]);
        http.post(`photos/ad=${id}/add`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            getPhotos();
        })
        
    };

    const removePhoto = () => {
        const carousel = document.getElementById('carouselExample').children[0].children;
        const activeEl = Array.from(carousel).findIndex(photo => photo.classList.contains('active'));
        http.post(`/photos/delete/${photos[activeEl].id}`)
            .then(() => {
                getPhotos();
                const main = photos[0];
                if (main != undefined){
                    document.getElementById("photo_0").classList.add("active");
                    setActivePhotoIndex(0);
        }
            })
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            carId : carId,
            year : year,
            price : price,
            mileage : mileage,
            enginePower : enginePower,
            engineCC : engineCC,
            color : color,
            steeringPlacement : steeringPlacement,
            gearbox : gearbox,
            status : status,
            publisherId : publisher.id,
            chassisNumber : chassisNumber,
            fuelType : fuelType,
            description: description
        };

        http
            .put(`/ad/update/${id}`, data)
            .then(() => {
                setSubmitted(true);
            })  
    };

    return (

        <div className="container-fluid vw-100 px-4" >
            {(!submitted) ? (
            <div className="row">
                <div className="col-md-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-2">
                                <input
                                    type="text"
                                    name="chaNum"
                                    value={chassisNumber}
                                    placeholder="Номер кузова или VIN"
                                    onChange={handleChangeChassis}
                                    className="form-control"
                                    required
                                    id="chaInput"
                                />
                                <label htmlFor="chaInput">Номер кузова или VIN</label>
                            </div>
                            <div className="form-floating mb-2">
                                <select className="form-select" value={carId} onChange={handleChangeCar} id="carSelect" required>
                                    <option value="">Выберите модель</option>
                                    {cars.map(car =>(
                                        <option key={car.id} value={car.id}>{car.name}</option>
                                    ))}
                                </select>
                                <label htmlFor="carSelect">Модель</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="number"
                                    name="year"
                                    value={year}
                                    placeholder="Год выпуска"
                                    onChange={handleChangeYear}
                                    className="form-control"
                                    required
                                    id="yearInput"
                                />
                                <label htmlFor="yearInput">Год выпуска</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="number"
                                    name="price"
                                    value={price}
                                    placeholder="Цена, Р"
                                    onChange={handleChangePrice}
                                    className="form-control"
                                    required
                                    id="priceInput"
                                />
                                <label htmlFor="priceInput">Цена, Р</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="number"
                                    name="mileage"
                                    value={mileage}
                                    placeholder="Пробег, км"
                                    onChange={handleChangeMileage}
                                    className="form-control"
                                    required
                                    id="mileageInput"
                                />
                                <label htmlFor="mileageInput">Пробег, км</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="number"
                                    name="enginePower"
                                    value={enginePower}
                                    placeholder="Мощность, л.с."
                                    onChange={handleChangePower}
                                    className="form-control"
                                    required
                                    id="powerInput"
                                />
                                <label htmlFor="powerInput">Мощность, л.с.</label>
                            </div>
                            
                            <div className="d-flex my-2">
                                <button type="submit" className="btn btn-success flex-grow-1 me-2">Обновить</button>
                                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Отмена</button>
                            </div>
                        </form>
                </div>
                <div className="col-md-auto">
                    <div className="form-floating mb-2">
                                <input
                                    type="number"
                                    name="price"
                                    value={engineCC}
                                    placeholder="Объем, л."
                                    onChange={handleChangeCC}
                                    className="form-control"
                                    required
                                    id="engineCCInput"
                                />
                                <label htmlFor="engineCCInput">Объем, л.</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input
                                    type="text"
                                    name="price"
                                    value={color}
                                    placeholder="Цвет"
                                    onChange={handleChangeColor}
                                    className="form-control"
                                    required
                                    id="colorInput"
                                />
                                <label htmlFor="colorInput">Цвет</label>
                            </div>
                            <div className="form-floating mb-2">
                                <select className="form-select" value={steeringPlacement} onChange={handleChangeSteering} id="steeringSelect" required>
                                    <option value="">Расположение руля</option>
                                    <option value="LEFT">Слева</option>
                                    <option value="RIGHT">Справа</option>
                                </select>
                                <label htmlFor="steeringSelect">Руль</label>
                            </div>
                            <div className="form-floating mb-2">
                                <select className="form-select" value={gearbox} onChange={handleChangeGearbox} id="gearboxSelect" required>
                                    <option value="">Коробка передач</option>
                                    <option value="MANUAL">МКПП</option>
                                    <option value="AUTOMATIC">АКПП</option>
                                    <option value="ROBOT">Робот</option>
                                    <option value="VARIATOR">Вариатор</option>
                                </select>
                                <label htmlFor="gearboxSelect">Коробка передач</label>
                            </div>
                            <div className="form-floating mb-2">
                                <select className="form-select" value={fuelType} onChange={handleChangeFuel} id="fuelSelect" required>
                                    <option value="">Топливо</option>
                                    <option value="BENZINE">Бензин</option>
                                    <option value="DIESEL">Дизель</option>
                                    <option value="HYBRID">Гибрид</option>
                                    <option value="LPG">ГБО</option>
                                </select>
                                <label htmlFor="fuelSelect">Топливо</label>
                            </div>
                            <div className="form-floating mb-2">
                                <textarea
                                    name="desc"
                                    value={description}
                                    placeholder="Описание"
                                    onChange={handleChangeDescription}
                                    className="form-control"
                                    required
                                    id="descriptionInput"
                                />
                                <label htmlFor="descriptionInput">Описание</label>
                            </div>
                </div>
                <div className="col-3">
                        <div className="">
                            {photos.length === 0 ? (
                                <div className="ratio ratio-1x1">
                                    <div className="mb-3 border rounded border border-secondary rounded d-flex justify-content-center align-items-center">
                                    <label style={{ cursor: "pointer" }}>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleChangePhoto}
                                            className="d-none"
                                        />
                                        <div className="text-center">
                                            <p className="text-secondary">Добавить фото</p>
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
                                
                                {photos.length < 70 && (
                                    <label style={{ width: "70px", height: "70px" }}>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleChangePhoto}
                                            className="d-none"
                                        />
                                        <div className="w-100 h-100 border border-secondary rounded d-flex justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                                            <span className="text-secondary">+</span>
                                        </div>
                                    </label>
                                )}
                            </div>
                        )}
                        
                        <div className="text-muted small">
                            Загружено: {photos.length}/70 фото
                        </div>
                        <div>
                            <button
                                className="btn btn-danger my-2"
                                onClick={(e) => {
                                    removePhoto();
                                }}
                                >
                                Удалить фото
                            </button>
                        </div>
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
                                    <img src={photos[activePhotoIndex].file} className="img-fluid h-100"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            ) : (<Navigate to={`/ad/${id}`}></Navigate>)}
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(UpdateAd);
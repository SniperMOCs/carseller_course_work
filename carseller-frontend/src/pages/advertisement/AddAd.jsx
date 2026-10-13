import { useEffect, useState } from "react";
import http from "../../http-common";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function AddAd({isLoggedIn, user}) {
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
    const publisherId = user == null ? null : user.user.id;

    const [chassisNumber, setChassisNumber] = useState("");
    const [fuelType, setFuelType] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [cars, setCars] = useState([]);
    
    const [photos, setPhotos] = useState([]);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    useEffect(() => {
        http.get("/cars")
            .then(response => {
                setCars(response.data);
            })
    }, [])

    useEffect(() => {
        const main = photos[0];
        if (main != undefined){
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

    const handleChangePhoto = (e) => {
        const files = Array.from(e.target.files);
        if (photos.length + files.length > 70) {
            alert('Максимум 70 фотографий');
            return;
        }
        
        const newPhotos = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        
        setPhotos([...photos, ...newPhotos]);
    };

    const removePhoto = (indexToRemove) => {
        const newPhotos = photos.filter((_, index) => index !== indexToRemove);
        setPhotos(newPhotos);
        setActivePhotoIndex(0);
    };


    const handeSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        
        data.append('carId', carId);
        data.append('year' , year);
        data.append('price' , price);
        data.append('mileage' , mileage);
        data.append('enginePower' , enginePower);
        data.append('engineCC' , engineCC);
        data.append('color' , color);
        data.append('steeringPlacement' , steeringPlacement);
        data.append('gearbox' , gearbox);
        data.append('status' , status);
        data.append('publisherId' , publisherId);
        data.append('chassisNumber' , chassisNumber);
        data.append('fuelType' , fuelType);
        data.append('description',  description);
        photos.forEach(photo => {
            data.append('photoFiles', photo.file);
        });

        http
            .post("/ads/add", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                setSubmitted(true);
            })
    };

    return (
        <div className="container-fluid vw-100 px-4">
            {isLoggedIn &&!submitted ? (
            <div className="row">
                <div className="col-md-auto">
                        <form onSubmit={handeSubmit}>
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
                            
                            <button type="submit" className="btn btn-success mt-2">Добавить</button>
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
                                    <label className="" style={{ cursor: "pointer" }}>
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
                                            <div className="carousel-item" key={index} id={"photo_" + index} onClick={() => setActivePhotoIndex(index)}>
                                                <div className="ratio ratio-1x1 border rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <img src={photo.preview} className="object-fit-cover" alt={photo.name}/>
                                                </div>
                                                <div className="">
                                                        <button
                                                            className="btn-close top-0 end-0 m-2 position-absolute"
                                                            onClick={(e) => {
                                                                removePhoto(index);
                                                            }}
                                                            >
                                                        </button>
                                                    </div>
                                            </div>
                                        ))}
                                            
                                    </div>
                                {photos.length > 1 && (
                                    <>
                                        <button className="carousel-control-prev h-75 align-self-center" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next h-75 align-self-center" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
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
                                                    key={"miniature_" + index} 
                                                    className="position-relative"
                                                    data-bs-target="#carouselExample"
                                                    data-bs-slide-to={index}
                                                    style={{ width: "70px", height: "70px" }}
                                                    onClick={() => setActivePhotoIndex(index)}
                                                    id={"miniature_" + index}
                                                >
                                                    <img
                                                        src={photo.preview}
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
                                    <img src={photos[activePhotoIndex] != undefined ? photos[activePhotoIndex].preview : null} className="img-fluid h-100"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            ) : (
                <Navigate to="/" />
                    )}
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(AddAd);
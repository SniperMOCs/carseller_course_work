import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import http from "../../http-common";
import Ads from "../../components/Ads";
import { connect } from "react-redux";

const BrandData = ({user}) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState("");
    const [cars, setCars] = useState([]);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        http.get(`/brand/${id}`)
            .then(response => {
                setName(response.data.name);
                setCountryId(response.data.country.id);
            })
        http.get(`/cars/brandId=${id}`)
                    .then(response => {
                        setCars(response.data);
                    })
        http.get(`/ads/brand=${id}`)
                    .then(response => {
                        setAds(response.data);
                    })
    }, [id])

    useEffect(() => {
            http.get("/countries")
                .then(response => {
                    setCountries(response.data);
                })
        }, [])

    const handleChange = (event) => {
            setName(event.target.value);
    };

    const handleChangeCountry = (event) => {
        setCountryId(event.target.value);
    };
    
    const handeSubmit = (event) => {
            event.preventDefault();
    
            const data = {
                name: name,
                countryId: countryId
            };
    
            http
                .put(`/brand/update/${id}`, data)
                .then(() => {
                    setSubmitted(true);
                })
        };

    const deleteBrand = () => {
        http
            .post(`/brand/delete/${id}`)
            .then(() => {
                setSubmitted(true);
            })
    }

    return (
        <div className="container-md mt-3">
            <div className="row" style={{maxWidth: "25%"}}>
                <div className="col">
                    <h1>{name}</h1>
                </div>
            </div>
            {user != null && user.user.role === "ADMIN" && (
            <div className="row" style={{maxWidth: "50%"}}>
                <div className="col">
                    {!submitted ? (
                        <form onSubmit={handeSubmit}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Название марки"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-floating">
                                <select className="form-select" value={countryId} onChange={handleChangeCountry} id="countrySelect">
                                    <option value="">Страна</option>
                                    {countries.map(country =>(
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                                <label htmlFor="countrySelect">Выберите страну</label>
                            </div>
                            <div className="d-flex my-2">
                                <button type="submit" className="btn btn-success flex-grow-1 me-2">Обновить</button>
                                <button className="btn btn-danger" onClick={deleteBrand}>Удалить</button>
                            </div>
                        </form>
                    ) : (
                        <Navigate to="/brands" />
                    )}
                </div>
            </div>
            )}
            <div className="row">
                <div className="col">
                    <h3>Модели</h3>
                    <div className="d-flex flex-wrap gap-3">
                        {cars.map((car, i) => (
                            <Link key={i} to={`/car/${car.id}`} className="btn btn-dark p-2">
                                <h5>{car.name}</h5>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row">
                {ads.length > 0 && (
                    <Ads endpoint={`/ads/brand=${id}`}/>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(BrandData);
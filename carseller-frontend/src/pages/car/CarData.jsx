import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import http from "../../http-common";
import Ads from "../../components/Ads";
import { connect } from "react-redux";

const CarData = ({user}) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState(1);
    const [ads, setAds] = useState([]);
    const [stat, setStat] = useState("");

    useEffect(() => {
        http.get(`/car/${id}`)
            .then(response => {
                setName(response.data.name);
                setBrandId(response.data.brand.id);
            })
        http.get(`/ads/car=${id}`)
            .then(response => {
                setAds(response.data);
            })
        http.get(`/stats/${id}`)
            .then(response => {
                setStat(response.data);
            })
    }, [id])

    useEffect(() => {
            http.get("/brands")
                .then(response => {
                    setBrands(response.data);
                })
        }, [])

    const handleChange = (event) => {
            setName(event.target.value);
    };

    const handleChangeBrand = (event) => {
        setBrandId(event.target.value);
    };
    
    const handeSubmit = (event) => {
            event.preventDefault();
    
            const data = {
                name: name,
                brandId: brandId
            };
    
            http
                .put(`/car/update/${id}`, data)
                .then(() => {
                    setSubmitted(true);
                })
        };

    const deleteCar = () => {
        http
            .post(`/car/delete/${id}`)
            .then(() => {
                setSubmitted(true);
            })
    }

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col">
                    <h1>{name}</h1>
                    {stat.averageSellingTime != null && stat.averagePrice != null && (
                        <>
                            <p className="text-muted">Время продажи: {stat.averageSellingTime} дней</p>
                            <p className="text-muted">Средняя цена: {stat.averagePrice} ₽</p>
                        </>)}
                    
                </div>
            </div>
            {user != null && user.user.role === "ADMIN" && (
            <div className="row">
                <div className="col" style={{maxWidth: "75%"}}>
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
                                <select className="form-select" value={brandId} onChange={handleChangeBrand} id="brandSelect">
                                    {brands.map(brand =>(
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                                <label htmlFor="brandSelect">Выберите марку</label>
                            </div>
                            <div className="d-flex my-2">
                                <button type="submit" className="btn btn-success flex-grow-1 me-2">Обновить</button>
                                <button className="btn btn-danger" onClick={deleteCar}>Удалить</button>
                            </div>
                        </form>
                    ) : (
                        <Navigate to="/cars" />
                    )}
                </div>
            </div>
            )}
            <div className="row">
                {ads.length > 0 && (
                    <Ads endpoint={`/ads/car=${id}`}/>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(CarData);
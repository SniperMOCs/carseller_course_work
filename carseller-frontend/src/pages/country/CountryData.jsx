import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import http from "../../http-common";
import ListBrands from "../brand/ListBrands";
import Ads from "../../components/Ads";
import { connect } from "react-redux";

const CountryData = ({user}) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [brands, setBrands] = useState([]);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        http.get(`/country/${id}`)
            .then(response => {
                setName(response.data.name);
            })
        http.get(`/brands/country/${id}`)
            .then(response => {
                setBrands(response.data);
            })
        http.get(`/ads/country=${id}`)
            .then(response => {
                setAds(response.data);
            })
    }, [id])

    const handleChange = (event) => {
            setName(event.target.value);
    };
    
    const handeSubmit = (event) => {
        event.preventDefault();
    
        const data = {
            name: name
        };
    
        http
            .put(`/country/update/${id}`, data)
            .then(() => {
                setSubmitted(true);
            })
    };

    const deleteCountry = () => {
        http
            .post(`/country/delete/${id}`)
            .then(() => {
                setSubmitted(true);
            })
    }

    return (
        <div className="container-fluid">
            <div className="row" style={{maxWidth: "25%"}}>
                <div className="col">
                    <h1>{name} </h1>
                </div>
            </div>
            {user != null && user.user.role === "ADMIN" && (
            <div className="row" style={{maxWidth: "75%"}}>
                <div className="col">
                    {!submitted ? (
                        <form onSubmit={handeSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Название страны"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="d-flex my-2">
                                <button type="submit" className="btn btn-success flex-grow-1 me-2">Обновить</button>
                                <button className="btn btn-danger" onClick={deleteCountry}>Удалить</button>
                            </div>
                            
                        </form>
                    ) : (
                        <Navigate to="/countries" />
                    )}
                </div>
            </div>
            )}
            <div className="row">
                <div className="col">
                    <h3>Марки</h3>
                    <div className="d-flex flex-wrap gap-3">
                        {brands.map((brand, i) => (
                            <Link key={i} to={`/brand/${brand.id}`} className="btn btn-dark p-2">
                                <h5>{brand.name}</h5>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row">
                {ads.length > 0 && (
                    <Ads endpoint={`/ads/country=${id}`}/>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(CountryData);
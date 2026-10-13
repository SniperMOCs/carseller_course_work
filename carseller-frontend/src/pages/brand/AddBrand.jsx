import { useEffect, useState } from "react";
import http from "../../http-common";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const AddBrand = ({user}) => {
    const [name, setName] = useState("");
    const [countryId, setCountryId] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [countries, setCountries] = useState([]);

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
            .post("/brand/add", data)
            .then(() => {
                setSubmitted(true);
            })
    };

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col">
                    {user != null && !submitted && user.user.role === "ADMIN" ? (
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
                            <button type="submit" className="btn btn-success mt-2">Добавить</button>
                        </form>
                    ) : (
                        <Navigate to="/brands" />
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(AddBrand);
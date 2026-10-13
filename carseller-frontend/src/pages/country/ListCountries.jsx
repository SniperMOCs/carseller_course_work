import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import http from "../../http-common";
import { connect } from "react-redux";

const ListCountries = ({user}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        http.get("/countries")
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col">
                    <h1>Страны</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-wrap gap-3">
                        {countries.map((country, i) => (
                            <Link key={i} to={`/country/${country.id}`} className="btn p-2">
                                <h3>{country.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {user != null && user.user.role === "ADMIN" && (
                <div className="row my-5">
                    <div className="col">
                        <Link to="/addCountry" className="btn btn-success mb-3">Добавить страну</Link>
                    </div>
                </div>
            )}
            
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(ListCountries);
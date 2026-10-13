import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import http from "../../http-common";
import { connect } from "react-redux";

const ListBrands = ({user}) => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        http.get("/brands")
            .then(response => {
                setBrands(response.data);
            })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col">
                    <h1>Марки</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-wrap gap-3">
                        {brands.map((brand, i) => (
                            <Link key={i} to={`/brand/${brand.id}`} className="btn p-2">
                                <h3>{brand.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {user != null && user.user.role === "ADMIN" && (
            <div className="row my-5">
                <div className="col">
                    <Link to="/addBrand" className="btn btn-success mb-3">Добавить марку</Link>
                </div>
            </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(ListBrands);
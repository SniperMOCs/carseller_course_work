import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import http from "../../http-common";
import { connect } from "react-redux";

const ListCars = ({user}) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        http.get("/cars")
            .then(response => {
                setCars(response.data);
            })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col">
                    <h1>Модели</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-wrap gap-3">
                        {cars.map((car, i) => (
                            <Link key={i} to={`/car/${car.id}`} className="btn p-2">
                                <h3>{car.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {user != null && user.user.role === "ADMIN" && (
                <div className="row my-5">
                    <div className="col">
                        <Link to="/addCar" className="btn btn-success mb-3">Добавить модель</Link>
                    </div>
                </div>
            )}
            
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(ListCars);
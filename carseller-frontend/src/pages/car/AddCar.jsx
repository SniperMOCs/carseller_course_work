import { useEffect, useState } from "react";
import http from "../../http-common";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function AddCar({user}) {
    const [name, setName] = useState("");
    const [brandId, setBrandId] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [brands, setBrands] = useState([]);

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
            .post("/car/add", data)
            .then(() => {
                setSubmitted(true);
            })
    };

    return (
        <div className="container-md mt-3">
            <div className="row">
                <div className="col">
                    {(user != null && !submitted && user.user.role === "ADMIN") ? (
                        <form onSubmit={handeSubmit}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Название модели"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-floating">
                                <select className="form-select" value={brandId} onChange={handleChangeBrand} id="brandSelect">
                                    <option value="">Марка</option>
                                    {brands.map(brand =>(
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                                <label htmlFor="brandSelect">Выберите марку</label>
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Добавить</button>
                        </form>
                    ) : (
                        <Navigate to="/cars" />
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(AddCar);
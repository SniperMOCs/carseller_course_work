import { useState } from "react";
import http from "../../http-common";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function AddCountry({user}) {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handeSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name
        };

        http
            .post("/country/add", data)
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
                            <button type="submit" className="btn btn-success mt-2">Добавить</button>
                        </form>
                    ) : (
                        <Navigate to="/countries" />
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(AddCountry);
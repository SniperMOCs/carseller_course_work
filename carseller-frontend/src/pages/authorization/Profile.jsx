import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

const Profile = ({ user }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }

    const date = new Date(user.user.registerDate);
    const formattedDate = date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    return (
        <div className="container">
            <header>
                <h3>
                    Профиль <strong>{user.user.name}</strong>
                </h3>
            </header>
            <p>
                <strong>E-mail: </strong>
                {user.user.email}
            </p>
            <p>
                <strong>Дата регистрации: </strong>
                {formattedDate}
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Profile);

import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from "../../actions/auth";
import httpCommon from '../../http-common';

const Login = ({ isLoggedIn, message, dispatch }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    loading: false
  });

  const { name, password, loading } = formData;

  const onChangeName = e => setFormData({ ...formData, name: e.target.value });
  const onChangePassword = e => setFormData({ ...formData, password: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });

    try {
      await dispatch(auth.login(name, password));
      window.location.reload();
    } catch (error) {
      setFormData({ ...formData, loading: false });
    }
  };

  if (isLoggedIn) {
    httpCommon.get("/api/auth/current-user")
    .then(response => {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    })
    
    return <Navigate to="/" />;
  }

  return (
      <div className="container mt-3">
        <div className="col">
          <h1>Вход в аккаунт</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group mt-2">
              <input type="text" className="form-control" name="name" placeholder="Логин" value={name} onChange={onChangeName} required/>
            </div>
            <div className="form-group mt-2">
              <input type="password" className="form-control" name="password" placeholder="Пароль" value={password} onChange={onChangePassword} required/>
            </div>

            <div className="form-group mt-2">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Войти</span>
              </button>
            </div>
            <div className="form-group mt-2">
              <Link to="/register">Зарегистрироваться</Link>
            </div>
            {message && loading && (
                <div className="form-group mt-2">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
            )}
          </form>
        </div>
      </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  message: state.message.message
});

export default connect(mapStateToProps)(Login);

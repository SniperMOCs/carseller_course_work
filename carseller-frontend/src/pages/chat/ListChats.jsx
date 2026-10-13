import { useEffect, useRef, useState } from "react";
import http from "../../http-common";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import ChatWebSocketService from "../../services/chat.service";

function ListChats({user}){
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        http.get("/chats/my")
            .then(response => {
                setChats(response.data);
            })
    }, []);

    const deleteChat = (chatId) => {
        http.post(`/chats/${chatId}/delete`)
            .then(() => {
                window.location.reload();
            })
    }


    return (
        <div className="container-fluid">
            <div className="row m-2 w-50">
                <h3>Чаты</h3>
                {chats.length > 0 ? (
                    <div className="list-group">
                        {chats.map((chat, i) => (
                        <div className="list-group-item d-flex" key={i}>
                            <div className="w-100" style={{ cursor: "pointer" }} onClick={() => {navigate(`/chat/${chat.id}`)}}>
                            {chat.buyer.id === user.user.id ? (
                                <h5>{chat.ad.publisher.name}</h5>
                                ) : (
                                <h5>{chat.buyer.name}</h5>
                                )}
                                <h6>{chat.ad.car.brand.name} {chat.ad.car.name}, {chat.ad.year}, {new Intl.NumberFormat('ru-RU').format(chat.ad.price)} ₽</h6>
                                <p className="text-muted"></p>
                            </div>
                            <div className="">
                                <button className="btn btn-danger bi bi-x-lg" onClick={() => {deleteChat(chat.id)}}>
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                ) : (
                    <p> Ничего не найдено </p>
                )}
                
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(ListChats);
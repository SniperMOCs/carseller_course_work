import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import http from "../../http-common";
import Card from "../../components/Card";

function Chat({user}) {
    const { id } = useParams();
    const [chat, setChat] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chat == ''){
            const data = {
                adId: parseInt(id),
                chatId: null,
                content: newMessage
            }
            http.post('/messages/addFirst', data)
                .then(response => {
                    setChat(response.data.chat);
                    navigate(`/chat/${response.data.chat.id}`);
                })
        }
            
        else{
            const data = {
                chatId: chat.id,
                adId: null,
                content: newMessage
            }
            http.post('/messages/add', data)
        }
        getMessages();
        setNewMessage('');
    };

    const getMessages = () => {
        if (Number.isInteger(chat.id)){
            http.get(`/messages/chat/${chat.id}`)
            .then(response => {
                setMessages(response.data);
            })
        }
    }

    useEffect(() => {
        http.get(`/ad/${id}`)
            .then(response => {
                setAd(response.data);
            })
        http.get(`/chats/ad=${id}`)
        .then(response => {
                if (response.data != ''){
                    navigate(`/chat/${response.data.id}`)
                }
                setChat(response.data);
            })
    }, []);

    useEffect(() => {
            const loadPhoto = async () => {
                if (ad!=null && ad.photos.length != 0){
                    http.get(`/photos/${ad.photos[0].id}`)
                    .then((response) => {
                        setPhoto(response.data);
                    })
                }
            };
            loadPhoto();
        }, [ad])

    const formatDateTime = (iniDate) =>{
        const date = new Date(iniDate);
        const time = date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        return `${time} ${formattedDate}`;
    }

    return (
        <div className="container">
            {user != null ? (
                <>
                    <div className="row">
                        <div className="text-center mb-4">
                            <h1>Чат</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card mb-3 w-50 mx-auto overflow-y-scroll"  style={{height: "75vh"}}>
                                {ad != null && (
                                    <div className="border-bottom" style={{ cursor: "pointer", height: "8vh" }} onClick={() => {navigate(`/ad/${ad.id}`)}}>
                                        <div className="d-flex gap-2">
                                            <img className="img-fluid object-fit-cover" style={{ height: "8vh" }} src={photo.file}/>
                                            <div>
                                                <h6>{ad.car.brand.name} {ad.car.name}, {ad.year}</h6>
                                                <p className="text-muted">{new Intl.NumberFormat('ru-RU').format(ad.price)} ₽</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="card-body">
                                    
                                    <div className="list-group d-flex" >
                                        {messages.map((message) => (
                                        <div className={`list-group-item mb-2 border-0 ${message.sender.id === user.user.id ? 'align-self-end' : 'align-self-start'}`} key={message.id}>
                                            <div 
                                            className={`p-3 rounded-3 ${message.sender.id === user.user.id 
                                                ? 'bg-primary text-white' 
                                                : 'bg-body-tertiary'}`}
                                            >
                                                <div className="fw-bold">{message.sender.name}</div>
                                                <div>{message.content}</div>
                                                <div className={`small ${message.sender.id === user.user.id ? 'text-white-50' : 'text-muted'}`}>
                                                    {formatDateTime(message.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                        <div ref={messagesEndRef} /> 
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSendMessage} className="form w-50 mx-auto">
                                <div className="d-flex">
                                    <input type="text" className="form-control me-2" value={newMessage} onChange={(e) => {setNewMessage(e.target.value)}} placeholder="Введите сообщение"></input>
                                    <button className="btn btn-primary" type="submit">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
                ) : (
                <>
                    <Navigate to={`/ad/${id}`} />
                </>
            )}
            
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Chat);
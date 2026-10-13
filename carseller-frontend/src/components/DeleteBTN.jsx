import http from "../http-common";
import { useState } from "react";

function DeleteBTN({adId, currentStatus}){
    const [status, setStatus] = useState(currentStatus);
    const statusOptions = {
    'PUBLISHED': {label: 'Активно', color: 'primary' },
    'SOLD': {label: 'Продано', color: 'success' },
    'HIDDEN': {label: 'Скрыто', color: 'info' },
    'ARCHIVED': {label: 'Архив', color: 'secondary' }
    };

    const handleAction = (status) => {
        http
            .put(`/ad/setStatus/${adId}`, status)
            .then(() => {
                setStatus(status);
                window.location.reload();
            })  
    }

    return (
        <>
            <button className={`btn border border-${statusOptions[status].color} text-${statusOptions[status].color}`} data-bs-toggle="modal" data-bs-target="#adStatusModal">{statusOptions[status].label}</button>

            <div className="modal fade" id="adStatusModal" tabIndex="-1" aria-labelledby="adStatusModalLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="adStatusModalLabel">Выберите статус</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body list-group">
                        <button className={`btn text-start ${"PUBLISHED" == status && 'disabled'}`} onClick={() => {handleAction("PUBLISHED")}} data-bs-dismiss="modal">Опубликовано</button>
                        <button className={`btn text-start ${"SOLD" == status && 'disabled'}`} onClick={() => {handleAction("SOLD")}} data-bs-dismiss="modal">Продано</button>
                        <button className={`btn text-start ${"HIDDEN" == status && 'disabled'}`} onClick={() => {handleAction("HIDDEN")}} data-bs-dismiss="modal">Скрыто</button>
                        <button className={`btn text-start ${"ARCHIVED" == status && 'disabled'}`} onClick={() => {handleAction("ARCHIVED")}} data-bs-dismiss="modal">В архиве</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteBTN;
function PlaceholderCard() {
    return (
        <div className="card m-2">
            <div className = "car-img-top" style={{minWidth: "250px"}}>
                <div className="ratio ratio-16x9" >
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                        <label>
                            <div className="text-center">
                                <p className="text-secondary"></p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className = "card-body border-top">
                <h5 className = "card-title placeholder-glow">
                    <span className="placeholder col-9 mx-2"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-4 mx-2"></span>
                </p>
            </div>
        </div>
    )
}

export default PlaceholderCard;
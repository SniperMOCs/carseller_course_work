import { useState } from "react";
import Ads from "../../components/Ads";

function ListFavorites(){

    return (
        <div className="container-fluid">
            <Ads endpoint="/favorites" caption="Избранное"></Ads>
        </div>
    )
}

export default ListFavorites
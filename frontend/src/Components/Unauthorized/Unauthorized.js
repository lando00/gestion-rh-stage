import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <div className="container align-items-center ">
            <div className="row mt-5 justify-content-center">
                <div className="card col-3 bg-danger align-self-center my-auto">
                    <div className="card-header">
                        <h2 className="card-title">Accès refusé !</h2>
                    </div>
                    <div className="card-body">
                        <p>
                            L'accès à cette section est reservé uniquement aux administrateurs
                        </p>
                    </div>
                    <button className="btn btn-danger" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized;
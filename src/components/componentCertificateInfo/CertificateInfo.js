import React from "react";
import  "./certificateInfo.css"

function CertificateInfo ({cerInfo}){
 
    const validFrom = cerInfo.validFrom.split(' ')[0]
    const validTill = cerInfo.validTill.split(' ')[0]
    
    return (
        <div className="area info">
            <p><b>Common Name:</b> {cerInfo.commonName}</p>
            <p><b>Issuer CN:</b> {cerInfo.issuerCN}</p>
            <p><b>Valid From:</b> {validFrom}</p>
            <p><b>Valid Till:</b> {validTill}</p>
        </div>
    )
}

export default CertificateInfo
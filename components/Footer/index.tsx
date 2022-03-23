import React from 'react'
import { useAlert } from "react-alert";

function Footer() {
    const alert = useAlert();
    return (
        <div className="footer">
            <div className="line-footer"></div>
            <span className="footext" onClick={() => alert.show('Fifth key : Mobula is a secret legend')}>Mobula © All right reserved</span>
        </div>

    )
}

export default Footer

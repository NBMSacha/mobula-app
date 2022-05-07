import React from "react";

function MenuMobile(props: any) {

    return (
        <>
            <div className="mobile-toolbar-container" id="mobileNav" style={{ display: "none" }} >
                <div className="mobile-linkTo">
                    <a href="soon" className="linkTo-newListing linkTo "><span className="linkTo-tag">New</span></a>
                    <a href="soon" className="linkTo-gainer linkTo"><span className="linkTo-tag">Gainers & Losers</span></a>
                    <a href="soon" className="linkTo-trending linkTo"><span className="linkTo-tag">Earn</span></a>
                    <a href="son" className="linkTo-dex linkTo"><span className="linkTo-tag">DEX</span></a>
                    <a href="soon" className="linkTo-dao linkTo"><span className="linkTo-tag">DAO</span></a>
                    <a href="list" className="linkTo-listAsset linkTo"><span className="linkTo-tag">List and asset</span></a>
                </div>
                <div className="connect-mobile-container">
                    <button className="connect-wallet-mobile">0x13..21EB</button>
                    <div className="rank-mobile-box">
                        <span>Rank II</span>
                        <span>2569 MOBL</span>
                    </div>
                </div>
                <div className="disconnect-wallet-mobile"><button className="nobg">Disconnect Wallet</button></div>
            </div>
        </>
    )

}

export default MenuMobile;
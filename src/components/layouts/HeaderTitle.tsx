import React from "react";
import { CloseIcon } from "../../public/assets/svg/close-icon";

import "./styles.scss";

interface Props {
    title: string;
    onCrossIconClick: () => void
}

const HeaderBg = (props: Props) => {
    return (
        <div className="header-title-wrapper">
            <header className="header-title">{props.title}</header>

            <div className="header-close-icon-wrapper" onClick={props.onCrossIconClick}>
                <CloseIcon />
            </div>
        </div>
    );

};
export default HeaderBg;

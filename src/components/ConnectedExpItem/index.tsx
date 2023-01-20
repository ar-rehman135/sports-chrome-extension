import React from "react";

import "./styles.scss";

export interface ConnectedExp {
    id: string;
    name: string;
    imgUrl: string;
    metadata: string;
    relatedAccounts?: number[];
}

interface Props {
    item: ConnectedExp;
}
export default function ConnectedExpItem({ item }: Props) {
    return (
        <>
            <div className="connected" onClick={() => { }}>
                <img className="connected__img" src={item.imgUrl} />
                <div className="connected__body">
                    <span className="connected__body__title">{item.name}</span>
                    <span>
                        connected on  {item.metadata}
                    </span>
                </div>
            </div>
        </>

    )
}

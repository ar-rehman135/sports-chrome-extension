import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../const/routeNames';

import rightArrow from "../../../public/assets/experience/arrow-right-blue.svg";

type Item = {
    appId: string;
    userId: string;
    appName: string;
    appDescription:string;
    appIcon: string;
    noOfUsers: string;
    appCategory: string;
    appDeveloper: string;
    appVersion: string;
    created: string;
    updated: string;
};

interface Props {
    item: Item
}

export default function ResultItem({ item }: Props) {

    return (
        <div className="result_item__root" >
            <div className="result_item__image">
                <img src={item.appIcon} />
            </div>

            <div className="result_item__text">
                <p className="result_item__text_name">{item.appName}</p>
                <p className="result_item__text_description">{item.appDescription}</p>
            </div>
            <div className="result_item__arrow_block">
                <img src={rightArrow} />
            </div>
        </div>
    );
}
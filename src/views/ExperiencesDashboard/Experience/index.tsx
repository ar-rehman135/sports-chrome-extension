import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../const/routeNames';

import rightArrow from "../../../public/assets/experience/arrow-right-blue.svg";

type Item = {
    app_callback_url: string;
    appId: string;
    app_url: string;
    category: string;
    developer:string;
    downloads_count: number;
    appName: string;
    owner_id: string;
    users_count: string;
    version: string;
    description: string;
    image: string;
};

interface Props {
    item: Item
}

export default function ExperienceItem({ item }: Props) {
    const navigate = useNavigate();
    const navigateToDetailApp = () => navigate(ROUTES.DETAIL_APP.url.replace(':id', item.appId));

    return (
        <div className="experience__root" onClick={navigateToDetailApp} >
            <div className="experience__image">
                <img src={item.image} />
            </div>

            <div className="experience__text">
                <p className="experience__text_name">{item?.appName}</p>
                <p className="experience__text_description">{item?.description}</p>
                <p className="experience__text_amount">{item.users_count} users</p>
            </div>
            <div className="experience__arrow_block">
                <img src={rightArrow} />
            </div>
        </div>
    );
}
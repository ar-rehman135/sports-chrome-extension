import React from "react";
import "./style.scss";

import rightArrow from "../../../public/assets/experience/arrow-right-black.svg";

type Application = {
	name: string;
	icon?: string;
	description: string;
	users?: number;
	onClick?: () => void;
};

interface Props {
	application: Application;
}

const Application = ({ application }: Props) => {
	return (
		<div className='application__root'>
			<div className='application__wrapper'>
				<div className='application_logo_wrapper'>
					<img src={application.icon} />
				</div>
				<div className='application_body_wrapper'>
					<p className='application_name'>{application.name}</p>
					<p className='application__category'>{application.description}</p>
					<p className='application__users'>+{application.users} users</p>
				</div>
			</div>

			<div className='application_arrow_wrapper' onClick={application.onClick}>
				<img src={rightArrow} />
			</div>
		</div>
	);
};

export default Application;

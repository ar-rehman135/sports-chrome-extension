import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "react-modal";

import { ROUTES } from "../../const/routeNames";

import accountImg from "../../public/assets/account-1.png";
import chevronImg from "../../public/assets/chevron-down.png";
import "./styles.scss";
import { useGetAccounts, useGetWalletBalance } from "../../hooks/api/accounts";
import { ContextMain } from "../../context/store";
import AccountItem from "../AccountItem";

Modal.setAppElement("#popup");

const SelectAccountBtn = () => {
	const [state] = React.useContext(ContextMain);

	const [accounts, setAccounts] = useState<Array<any>>();
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [selectedWalletId, setSelectedWalletId] = React.useState(state?.user?.walletName);

	const { accounts: myAccounts, isSearching } = useGetAccounts(state?.user?.userId);
	const { walletBalance } = useGetWalletBalance(selectedWalletId || state?.user?.walletName);


	const customStyles = {
		overlay: {
			backgroundColor: "rgba(51, 55, 59, 0.4)",
		},
	};

	const nav = useNavigate();

	const handleSelect = (walletId: string) => {
		setSelectedWalletId(walletId)
	}

	const openModal = () => {
		setIsOpen(!modalIsOpen);
	};

	const afterOpenModal = () => { };

	const closeModal = () => {
		setIsOpen(false);
	};

	const goToCreateNEAR = () => {
		nav(ROUTES.CREATE_ACCT.url);
	};

	const goToCreateHome = () => {
		nav(ROUTES.SIGNUP.url);
	};

	useEffect(() => {
		setAccounts(myAccounts);
	}, [myAccounts]);

	return (
		<>
			<a className='select-act' onClick={openModal}>
				<img className='select-act__img' src={accountImg} alt='' />
				<p className='select-act__name'> {state?.user?.walletName} </p>
				<img className='select-act__chevron' src={chevronImg} alt='' />
			</a>
			<Modal
				id='selectAccountModal'
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				className='modal-select-account'
				contentLabel='Example Modal'>
				<div className="my_account_wrapper">
					<img src='./assets/account-1.png' className="current_account_icon active" />
					<div className="account_near_amount_wrapper">
						{/* For now the ACCOUNT BALANCE will be for current wallet name as fetch all accounts 
						has not been implemented */}
						<h2 className="my_account_near">{walletBalance?.balance?.toFixed(5)} NEAR</h2>
						<img src="/assets/svg/icon-eye.svg" alt="eye-icon" />
					</div>
					{/* This walletBalance.balance should be multiplied by Near token usd price to
					get the price
					https://growthlab.atlassian.net/wiki/spaces/EKB/pages/40927269/NEAR+TOKEN+FIAT+PRICE
					Currently this API endpoint is not working */}
					<p className="my_account_amount">$ {walletBalance?.balance?.toFixed(5)}</p>
					<div className="account_send_receive_wrapper">
						<a className="detailApp__openBtn" href="#" target="_blank">
							<span>Send</span>
							<img src="/assets/svg/icon-send.svg" alt="send" />
						</a>
						<a className="detailApp__openBtn account_receive_btn" href="#" target="_blank">
							<span>Recieve</span>
							<img src="/assets/svg/icon-receive.svg" alt="send" />
						</a>
					</div>
				</div>
				<h2 className="my_account_header">My Accounts </h2>
				<div className="accounts_maximum_wrapper">
					{accounts && accounts.length > 0
						&& accounts.map((account: any) => {
							return (
								<AccountItem
									walletId={account?.walletId}
									isSelected={selectedWalletId === account?.walletId}
									handleClick={handleSelect}
								/>
							);
						})}
				</div>
				<div className='account-select-actions'>
					<a className='account-select-actions__link' onClick={goToCreateNEAR}>
						<img src='./assets/create-act.png' alt='' />
						Create Account
					</a>
					<a className='account-select-actions__link' onClick={goToCreateHome}>
						<img src='./assets/import-act.png' alt='' />
						Import Account
					</a>
				</div>
			</Modal>
		</>
	);
};

export default SelectAccountBtn;

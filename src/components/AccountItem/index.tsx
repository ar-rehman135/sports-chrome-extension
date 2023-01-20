import React from 'react'
import { useGetWalletBalance } from "../../hooks/api/accounts";

interface Props {
    walletId: string
    isSelected?: boolean,
    handleClick: (walletId: string) => void;
}

const AccountItem = ({ walletId, isSelected, handleClick }: Props) => {

    const { walletBalance } = useGetWalletBalance(walletId);

    return (
        <>
            <a
                onClick={() => handleClick(walletId)}
                className='account-item'>
                <img
                    className={`account-item__img  ${isSelected ? "active" : ""
                        }`}
                    src='./assets/account-1.png'
                    alt=''
                />
                <div className='account-item__body'>
                    <div className='account-item__body__name'>
                        {walletId}
                    </div>
                    <div className='account-item__body__ammount'>
                        {walletBalance?.balance?.toFixed(5)}
                    </div>
                </div>
                {isSelected === true ? (
                    <div className='account-item__check'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='14'
                            height='10'
                            viewBox='0 0 14 10'
                            fill='none'>
                            <path
                                d='M1.66663 5L5.66663 9L12.3333 1'
                                stroke='#33373B'
                                strokeWidth='2'
                                strokeLinecap='round'
                            />
                        </svg>
                    </div>
                ) : (
                    ""
                )}
            </a>
        </>
    )
}

export default AccountItem
import { useFormik } from 'formik';
import moment from 'moment';
import React, { MouseEventHandler, useState } from 'react'
import { useOffers } from '../../hooks/api/offers';
import makeOfferSchema from '../../validation/makeOfferSchema';

import { StyledButton, StyledMakeOfferModal } from './styles'

interface Props {
    onClose: MouseEventHandler<HTMLImageElement>,
    collectible: any
}

export default function MakeOfferModal({ onClose, collectible }: Props) {
    const [expiresData, setExpiresData] = useState(0);
    const {createOffer, isCreating} = useOffers();

    const calculateExpires = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = new Date(e.target.value).valueOf();
        const startDate = Date.now();
        const diffInMs = endDate - startDate;
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        setExpiresData(diffInDays);
        formik.handleChange(e);
    }

    const initialValues: any = {
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
      };
      
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: makeOfferSchema,
        validateOnMount: true,
        enableReinitialize: true,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            const payload = {
               nft_id: collectible.nft_id,
               expire_in: new Date(values.date),
               days_to_expire: expiresData,
               amount: values.amount
            }
            const newOffer = await createOffer(payload);
            console.info({ newOffer });
            onClose;
        },
      });
    return (
        <StyledMakeOfferModal>
            <div className='header'>
                <span className='title'>
                    Make an Offer
                </span>
                <img className='cross' src='/assets/cross.png' onClick={onClose} />
            </div>
            <div className='number'>
                # {collectible.id}
            </div>
            <div className="amount">
                <label className="amount_label">Amount</label>
                <input
                    id="amount"
                    type="number"
                    className={`amount_input`}
                    value={formik.values.amount}
                    onPaste={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </div>
            {
            /*<div className='balance'>
                <section className='balance_label'>
                    Balance
                </section>
                <section className='balance_value'>
                    1.0005 NEAR
                </section>
            </div> */}

            <div className="expires_label">Expires</div>

            <input
                id='date'
                type="date"
                onChange={calculateExpires}
                value={formik.values.date}
                onPaste={formik.handleChange}
                onBlur={formik.handleBlur}/>
            {
                expiresData > 0 && (
                    <div className='remain'>
                        Offer expires after {expiresData} days
                    </div>
                )
            }
            <StyledButton type="submit" onClick={(e: any) => formik.handleSubmit(e)}>
                <img
                    className="icon"
                    src="/assets/offer.png"
                />

                <span className="body__title">
                    Make Offer
                </span>

            </StyledButton>

        </StyledMakeOfferModal>
    )
}

import React, { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import Overlay from './Overlay';
import './styles.scss';

interface ModalProps {
    open: boolean,
    closeBtn: boolean;
    setOpen: (value: boolean) => void,
    children: ReactNode,
}

const Modal: FC<ModalProps> = ({
                                   open,
                                   closeBtn = false,
                                   setOpen,
                                   children
                               }) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [open]);

    return (
        <>
            {open && (
                <Overlay onClick={() => setOpen(false)}>
                    <div className="Modal" onClick={(e) => e.stopPropagation()}>
                        {closeBtn && (
                            <button className="Modal__close-btn" onClick={() => setOpen(false)}>
                                <img src="/assets/svg/close-icon.svg" alt="close"/>
                            </button>
                        )}
                        {children}
                    </div>
                </Overlay>
            )}
        </>
    );
};

export default Modal;

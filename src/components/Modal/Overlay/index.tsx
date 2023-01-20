import React, { FC, ReactNode } from 'react';
import './styles.scss';

interface OverlayProps {
    onClick: () => void;
    children: ReactNode;
}

const Overlay: FC<OverlayProps> = ({ onClick, children }) => {
    return (
        <div className="Overlay" onClick={onClick}>
            {children}
        </div>
    );
}

export default Overlay;

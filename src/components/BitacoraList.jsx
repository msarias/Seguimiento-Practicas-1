import React from 'react';
import BitacoraForm from './BitacoraForm';

const BitacoraList = () => {
    return (
        <section className="bitacora-list">
            <h2 className="bitacora-list__title">Bitácoras</h2>
            <div className="bitacora-list__item">
                <span className="bitacora-list__name">Bitácora 1</span>
                <button className="bitacora-list__button">Ver</button>
                
            </div>
            <BitacoraForm />
        </section>
        
    );
};

export default BitacoraList;

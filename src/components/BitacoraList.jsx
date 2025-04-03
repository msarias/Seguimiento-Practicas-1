import React, { useEffect, useState } from 'react';
import BitacoraForm from './BitacoraForm';

const BitacoraList = () => {

    const [bitacoras, SetBitacoras] = useState([]);

    useEffect(()=>{
        const obtenerBitacoras = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/bitacoras/verBitacoras');
                const data = await res.json();
                if (res.ok) {
                    console.log('data: ', {data});
                }
                SetBitacoras(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerBitacoras();
    }, [bitacoras.length])

    return (
        <section className="bitacora-list">
            <h2 className="bitacora-list__title">Bitácoras</h2>
            <div className="bitacora-list__item">
                <span className="bitacora-list__name">Bitácora 1</span>
                <button className="bitacora-list__button">Ver</button>
                {bitacoras.length > 0 ? (
                    bitacoras.map((b, index)=>(
                        <div>
                            <p><strong>{`Bitácora #${index+1}`}</strong></p>
                            <p>{b.archivo}</p>
                            <p>{b.codigo}</p>
                            <p>{b.fecha}</p>
                        </div>
                    ))
                ) : <p>No hay bitácoras</p>}
            </div>
            <BitacoraForm />
        </section>
    );
};

export default BitacoraList;

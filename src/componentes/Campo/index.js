import React from 'react';
import './Campo.css';

const Campo = (props) => {
    const digitado = (evento) => {
        props.alterado(evento.target.value);
    };

    return (
        <div className={`campo campo-${props.type || 'text'}`}>
            <label>{props.label}</label>
            <input
                type={props.type || 'text'}
                value={props.valor}
                onChange={digitado}
                required={props.obrigatorio}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default Campo;
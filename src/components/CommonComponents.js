import React from "react";
import propTypes from 'prop-types';


export const Button = ({ label, onClick, ...rest }) => (
    <button
        onClick={onClick}
        {...rest}
    >
        {label}
    </button>
);
Button.propTypes = {
    label: propTypes.string.isRequired,
    onClick: propTypes.func,
}
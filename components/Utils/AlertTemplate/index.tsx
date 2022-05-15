import React from 'react'
import InfoIcon from './icons/InfoIcon'
import SuccessIcon from './icons/SuccessIcon'
import ErrorIcon from './icons/ErrorIcon'
import CloseIcon from './icons/CloseIcon'

const alertStyle = {
    backgroundColor: '#2D3A5C',
    color: 'white',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 4px 4px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Arial',
    width: '350px',
    boxSizing: 'border-box',
    marginBottom: '30px',
}

const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}

export const AlertTemplate = ({ message, options, style, close }) => {
    return (
        <div style={{ ...alertStyle, ...style }}>
            {options.type === 'info' && <InfoIcon />}
            {options.type === 'success' && <SuccessIcon />}
            {options.type === 'error' && <ErrorIcon />}
            <span style={{ flex: 2 }}>{message}</span>
            <button onClick={close} style={buttonStyle}>
                <CloseIcon />
            </button>
        </div>
    )
}
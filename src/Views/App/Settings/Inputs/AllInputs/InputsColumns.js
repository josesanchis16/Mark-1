import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SETTINGS_EDIT_INPUT_PATH } from '../../../../../Paths';
import { getDefaultPropsForColumns, showModal } from '../../../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../../../Utils/ModalNames';

export const InputsColumns = () => {
    return [
        {
            ...getDefaultPropsForColumns("id", "#"),
            maxWidth: 35,
            Cell: ({ original: { id } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{id}</p>
                </div>
            )
        },
        {
            ...getDefaultPropsForColumns("identifier", "Identificador"),
            minWidth: 125,
            maxWidth: 250,
            Cell: ({ original: { identifier } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{identifier}</p>
                </div >
            )
        },
        {
            ...getDefaultPropsForColumns("label", "Título"),
            minWidth: 125,
            Cell: ({ original: { label } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{label}</p>
                </div >
            )
        },
        {
            ...getDefaultPropsForColumns("actions", "Acciones"),
            maxWidth: 150,
            Cell: ({ original: { guid } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Button
                        as={Link}
                        to={SETTINGS_EDIT_INPUT_PATH.replace(":guid", guid)}
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        variant="secondary"
                        size="sm">
                        <i className='material-icons'>&#xe3c9;</i>
                    </Button>
                    <Button
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        onClick={() => showModal(ModalNames.RemoveInput, { guid })}
                        variant="danger"
                        size="sm">
                        <i className='material-icons'>&#xe872;</i>
                    </Button>
                </div >
            )
        },
    ]
};
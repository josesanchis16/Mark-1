import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EDIT_MACHINE_PATH } from '../../../../Paths';
import { showModal } from '../../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../../Utils/ModalNames';

export const AllUsersColumns = () => {
    return [
        {
            id: 'id',
            Header: () => (<b>#</b>),
            maxWidth: 35,
            resizable: false,
            Cell: ({ original: machine, index }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{index + 1}</p>
                </div>
            )
        },
        {
            id: 'name',
            maxWidth: 250,
            Header: () => (<b>Nombre</b>),
            Cell: ({ original: machine }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{machine.name}</p>
                </div >
            )
        },
        {
            id: 'description',
            Header: () => (<b>Descripción</b>),
            Cell: ({ original: machine }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0 overflow-hidden" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{machine.description}</p>
                </div >
            )
        },
        {
            id: 'actions',
            Header: () => (<b>Acciones</b>),
            maxWidth: 175,
            resizable: false,
            Cell: ({ original: machine }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Button
                        as={Link}
                        to={EDIT_MACHINE_PATH.replace(":guid", machine.guid)}
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        variant="secondary"
                        size="sm">
                        <i className='material-icons'>&#xe3c9;</i>
                    </Button>
                    <Button
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        onClick={() => showModal(ModalNames.DeleteMachineModal, { guid: machine.guid })}
                        variant="danger"
                        size="sm">
                        <i className='material-icons'>&#xe872;</i>
                    </Button>
                </div >
            )
        },
    ]
};
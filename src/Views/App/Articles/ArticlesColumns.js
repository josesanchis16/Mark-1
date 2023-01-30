import { mdiPencil, mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { showModal } from '../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../Utils/ModalNames';

export const ArticlesColumns = () => {
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
            Header: () => (<b>Nombre</b>),
            Cell: ({ original: machine }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{machine.name}</p>
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
                        className="mx-1"
                        onClick={() => showModal(ModalNames.ViewMachineModal, { guid: machine.guid })}
                        variant="secondary"
                        size="sm">
                        <Icon path={mdiPencil} size="20" />
                    </Button>
                    <Button
                        className="mx-1"
                        onClick={() => showModal(ModalNames.DeleteMachineModal, { guid: machine.guid })}
                        variant="danger"
                        size="sm">
                        <Icon path={mdiTrashCan} size="20" />
                    </Button>
                </div >
            )
        },
    ]
};
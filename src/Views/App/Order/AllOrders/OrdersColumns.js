import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EDIT_ORDER_PATH } from '../../../../Paths';
import { showModal } from '../../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../../Utils/ModalNames';

export const OrdersColumns = (isAdmin) => {

    return [
        {
            id: 'id',
            Header: () => (<b>#</b>),
            maxWidth: 50,
            resizable: false,
            Cell: ({ original: { id } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{id}</p>
                </div>
            )
        },
        {
            id: 'number',
            minWidth: 100,
            Header: () => (<b>N. Orden</b>),
            Cell: ({ original: { number } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{number ? `${number}` : '---'}</p>
                </div>
            )
        },
        {
            id: 'serie',
            minWidth: 100,
            Header: () => (<b>Serie</b>),
            Cell: ({ original: { serie } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{serie ? `${serie}` : '---'}</p>
                </div>
            )
        },
        {
            id: 'actions',
            maxWidth: 175,
            Header: () => (<b>Acciones</b>),
            resizable: false,
            Cell: ({ original: order }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Button
                        as={Link}
                        to={EDIT_ORDER_PATH.replace(":guid", order.guid)}
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        variant="secondary"
                        size="sm">
                        <i className='material-icons'>&#xe3c9;</i>
                    </Button>
                    <Button
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        onClick={() => showModal(ModalNames.DeleteRecordModal, { guid: order.guid })}
                        variant="danger"
                        size="sm">
                        <i className='material-icons'>&#xe872;</i>
                    </Button>
                </div >
            )
        },
    ]
};
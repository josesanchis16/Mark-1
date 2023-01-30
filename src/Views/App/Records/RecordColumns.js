import { mdiPencil, mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import moment from 'moment/moment';
import React from 'react';
import { Button } from 'react-bootstrap';
import { numberWithCommas, showModal } from '../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../Utils/ModalNames';

export const RecordColumns = (isAdmin) => {

    return [
        {
            id: 'actions',
            Header: () => (<b>Acciones</b>),
            maxWidth: 175,
            resizable: false,
            Cell: ({ original: record }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Button
                        className="mx-1"
                        onClick={() => showModal(ModalNames.ViewRecordModal, { guid: record.guid })}
                        variant="secondary"
                        size="sm">
                        <Icon path={mdiPencil} size="20" />
                    </Button>
                    {isAdmin &&
                        <Button
                            className="mx-1"
                            onClick={() => showModal(ModalNames.DeleteRecordModal, { guid: record.guid })}
                            variant="danger"
                            size="sm">
                            <Icon path={mdiTrashCan} size="20" />
                        </Button>
                    }
                </div >
            )
        },
        {
            id: 'id',
            Header: () => (<b>No. Pedido</b>),
            maxWidth: 100,
            resizable: false,
            Cell: ({ original: record }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{record.recordNumber}</p>
                </div>
            )
        },
        {
            id: 'name',
            Header: () => (<b>Operario</b>),
            Cell: ({ original: { user: { name, lastname } } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{name ? `${name}${lastname ? ` ${lastname}` : ''}` : '---'}</p>
                </div>
            )
        },
        {
            id: 'machine',
            Header: () => (<b>Maquina</b>),
            Cell: ({ original: { machine: { name } } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{name || '---'}</p>
                </div>
            )
        },
        {
            id: 'tirada',
            Header: () => (<b>Tirada</b>),
            Cell: ({ original: record }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{record.tirada ? numberWithCommas(record.tirada) : '---'}</p>
                </div>
            )
        },
        {
            id: 'description',
            minWidth: 200,
            Header: () => (<b>Observaciones</b>),
            Cell: ({ original: record }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{record.description || '---'}</p>
                </div>
            )
        },
        {
            id: 'hours',
            minWidth: 200,
            Header: () => (<b>Hora fin</b>),
            Cell: ({ original: record }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{record.startDate ? moment(record.startDate).format("HH:mm / DD-MM-YYYY") : '---'}</p>
                    {/* <p className="mb-0">{record.startDate ? moment(record.startDate).format("DD-MM-YYYY") : '---'} / {record.endDate ? moment(record.endDate).format('DD-MM-YYYY') : '---'}</p> */}
                </div>
            )
        },
        // {
        //     id: 'dateDifference',
        //     minWidth: 150,
        //     Header: () => (<b>Tiempo de tarea</b>),
        //     Cell: ({ original: record }) => (
        //         <div className="d-flex justify-content-center align-items-center w-100">
        //             <p style={{ textTransform: 'capitalize' }} className="mb-0">{(record.startDate && record.endDate) ? moment.duration(moment(record.endDate).diff(record.startDate)).humanize() : '---'}</p>
        //         </div>
        //     )
        // },
    ]
};
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EDIT_USER_PATH } from '../../../../Paths';
import { getDefaultPropsForColumns, showModal } from '../../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../../Utils/ModalNames';
import { Roles } from '../../../../Utils/Roles';

export const UserColumns = (email) => {
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
            ...getDefaultPropsForColumns('name', 'Usuario'),
            minWidth: 150,
            maxWidth: 250,
            Cell: ({ original: { name } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{name}</p>
                </div>
            )
        },
        {
            ...getDefaultPropsForColumns('email', "Email"),
            minWidth: 250,
            Cell: ({ original: { email } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <p className="mb-0">{email}</p>
                </div>
            )
        },
        {
            ...getDefaultPropsForColumns('role', 'Puesto'),
            minWidth: 125,
            maxWidth: 125,
            Cell: ({ original: { roleid } }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    {roleid === 0
                        ? <p className="mb-0">{Roles.find(role => role.id === 1).name}</p>
                        : <p className="mb-0">{Roles.find(role => role.id === roleid).name}</p>
                    }
                </div>
            )
        },
        {
            ...getDefaultPropsForColumns('actions', 'Acciones'),
            maxWidth: 150,
            Cell: ({ original: user }) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Button
                        as={Link}
                        to={EDIT_USER_PATH.replace(":guid", user.guid)}
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        variant="secondary"
                        size="sm">
                        <i className='material-icons'>&#xe3c9;</i>
                    </Button>
                    <Button
                        disabled={email === user.email}
                        className="mx-1 px-3 d-flex justify-content-center align-items-center"
                        onClick={() => showModal(ModalNames.DeleteUserModal, { guid: user.guid })}
                        variant="danger"
                        size="sm">
                        <i className='material-icons'>&#xe872;</i>
                    </Button>
                </div >
            )
        },
    ]
};
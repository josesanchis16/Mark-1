import Icon from "@mdi/react";
import React from 'react';
import { Button } from "react-bootstrap";
const NavItem = ({ item, onClick, active }) => {
    console.log({ active, item: { ...item } });
    return (
        <Button
            onClick={() => onClick(item)}
            variant={item.path && active === item.path ? "secondary" : 'outline-secondary'}
            className="w-100 border-0 shadow-none d-flex justify-content-start align-items-center">
            <div className="pb-1">
                <Icon
                    path={item.icon}
                    size="20" />
            </div>
            <div className="ms-2">
                <p className="mb-0">
                    {item.title}
                </p>
            </div>
        </Button>
    )
}

export default NavItem;
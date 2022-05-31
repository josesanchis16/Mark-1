import Icon from "@mdi/react";
import React from 'react';
const NavItem = ({ item }) => {

    return (
        <div className="text-decoration-none d-flex justify-content-start align-items-center">
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
        </div>
    )
}

export default NavItem;
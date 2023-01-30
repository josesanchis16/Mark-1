import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useRoleManagement from "../../../../Hooks/useRoleManagement";
import { AdminNavItems, NavItems, SuperAdminNavItems } from "../../../../NavItems";
import { getSetCurrentPathAction, getSetPreviousPathAction, getToggleSideBarAction } from "../../../../Redux/Reducers/Config/Actions";
import store from "../../../../Redux/store";
import NavItem from "./NavItem/NavItem";
import NavParent from "./NavItem/NavParent";

const NavSection = ({ active }) => {

    const history = useHistory();

    const { isAdmin, isSuperAdmin, isWorker } = useRoleManagement();

    const [items, setItems] = useState([]);

    useEffect(() => {
        getNavItems();
    }, [isAdmin, isSuperAdmin, isWorker])

    const getNavItems = () => {
        console.log({ isSuperAdmin, isAdmin, isWorker });
        if (isSuperAdmin) setItems(SuperAdminNavItems);
        else if (isAdmin) setItems(AdminNavItems);
        else if (isWorker) setItems(NavItems)
    }

    const handleCloseClick = () => {
        store.dispatch(getToggleSideBarAction(false));
    }

    const simpleButton = (item) => {
        item.onClick();
        handleCloseClick();
    }

    const redirect = (item) => {
        store.dispatch(getSetPreviousPathAction(store.getState().Config.currentPath));
        store.dispatch(getSetCurrentPathAction(item.path));
        handleCloseClick();
        history.push(item.path);
    }

    const handleClick = (item) => {
        if (item.path && !item.children) redirect(item)
        else simpleButton(item)
    }

    return (
        <ul className="px-2 overflow-auto" style={{ listStyleType: 'none', height: 'calc(100vh - 80px - 3rem - 10px)' }}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className='w-100 mb-2'>
                    {item.children
                        ? <NavParent item={item} onChildClick={handleClick} active={active} />
                        : <NavItem active={active} onClick={handleClick} item={item} />
                    }
                </li>
            ))}
        </ul>
    )
}

export default NavSection
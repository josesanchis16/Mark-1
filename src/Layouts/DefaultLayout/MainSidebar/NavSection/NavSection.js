import { useHistory } from "react-router-dom";
import { NavItems } from "../../../../NavItems";
import { getSetCurrentPathAction, getSetPreviousPathAction, getToggleSideBarAction } from "../../../../Redux/Reducers/Config/Actions";
import store from "../../../../Redux/store";
import NavItem from "./NavItem/NavItem";

const NavSection = ({ active }) => {

    const history = useHistory();

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

    return (
        <ul className="px-2 overflow-auto" style={{ height: 'calc(100vh - 80px - 3rem - 10px)' }}>
            {NavItems.map((item, index) => (
                <li
                    onClick={() => item.path ? redirect(item) : simpleButton(item)}
                    key={index}
                    className={`my-1 w-100 btn btn-${(item.path && active === item.path) ? '' : 'outline-'}secondary border-0`}
                >
                    <NavItem item={item} />
                </li>
            ))}
        </ul>
    )
}

export default NavSection
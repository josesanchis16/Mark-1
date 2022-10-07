import { mdiAccount, mdiBell, mdiClose, mdiMessage } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useEffect, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GlobalConfig } from '../../../Configuration';
import { getToggleSideBarAction } from '../../../Redux/Reducers/Config/Actions';
import store from '../../../Redux/store';
import { showModal } from '../../../Utils/GeneralFunctions';
import { ModalNames } from '../../../Utils/ModalNames';
import NavSection from "./NavSection/NavSection";

const MainSidebar = ({ currentWidth }) => {

    const history = useHistory();
    const [pathName, setPathname] = useState('');

    useEffect(() => {
        setPathname(history.location.pathname)
        const historyListener = history.listen(e => {
            const { pathname } = e;
            setPathname(pathname);
        })
        return historyListener;
    }, [])

    const handleCloseClick = () => {
        store.dispatch(getToggleSideBarAction(false));
    }

    const openProfileModal = () => {
        store.dispatch(getToggleSideBarAction(false));
        showModal(ModalNames.ProfileModal);
    }

    return (
        <div className="overflow-hidden bg-light h-100 w-100">
            <div className='pt-4 d-md-none d-flex'>
                <Navbar.Brand className="w-100 mx-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start align-items-center">
                        <h1 className="ms-4 mb-0 h5 text-decoration-none text-muted">{GlobalConfig.appName}</h1>
                    </div>
                    <Button variant="outline-secondary" onClick={handleCloseClick} className="d-flex justify-content-center align-items-center border-0">
                        <Icon path={mdiClose} size="20" />
                    </Button>
                </Navbar.Brand>
            </div>
            <div className='d-md-flex d-none' style={{ height: GlobalConfig.navbarHeight }}>
                <Navbar.Brand className="d-flex justify-content-center align-items-center w-100 h-100">
                    <h1 className="mb-0 h5 text-decoration-none text-muted">{GlobalConfig.appName}</h1>
                </Navbar.Brand>
            </div>


            <div className="bg-light mt-5 px-2">
                <NavSection active={pathName} />
            </div>

            <div className='py-3 d-flex d-md-none pb-4 d-flex justify-content-center align-items-center' style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                {/* Messages */}
                <div className="mx-2">
                    <Button variant="outline-secondary" className="border-0">
                        <Icon path={mdiBell} size="25" />
                    </Button>
                </div>

                {/* Notifications */}
                <div className="mx-2">
                    <Button variant="outline-secondary" className="border-0">
                        <Icon path={mdiMessage} size="25" />
                    </Button>
                </div>
                {/* Notifications */}
                <div className="mx-2">
                    <Button onClick={openProfileModal} variant="outline-secondary" className="border-0">
                        <Icon path={mdiAccount} size="25" />
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default MainSidebar;
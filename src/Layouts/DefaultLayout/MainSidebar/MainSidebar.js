import { mdiAccount, mdiClose } from '@mdi/js';
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

import moment from 'moment/moment';
import logo from '../../../Assets/images/castell_encuadernacion.png';

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
        <div className={`overflow-hidden h-100 bg-${GlobalConfig.theme.mainLayout}`}>
            {currentWidth < GlobalConfig.breakpointWidth ?
                <div className='pt-4'>
                    <Navbar.Brand className="mx-2 d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center">
                            <h1 className="ms-4 mb-0 h5 text-decoration-none text-muted">{GlobalConfig.appName}</h1>
                        </div>
                        <Button variant="outline-secondary" onClick={handleCloseClick} className="d-flex justify-content-center align-items-center border-0">
                            <Icon path={mdiClose} size="20" />
                        </Button>
                    </Navbar.Brand>
                </div>
                :
                <div style={{ height: 80 }}>
                    <Navbar.Brand className="d-flex justify-content-center align-items-center w-100 h-100 flex-column">
                        <img src={logo} style={{ width: 150, height: 'auto' }} />
                        <h1 className="mb-0 h3 text-decoration-none text-muted">{GlobalConfig.appName}</h1>
                    </Navbar.Brand>
                </div>
            }


            <div className={`mt-5 px-2 bg-${GlobalConfig.theme.mainLayout}`} >
                <NavSection active={pathName} />
            </div>

            <div className='py-3 pb-4 d-flex justify-content-center align-items-center flex-column' style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                {currentWidth < GlobalConfig.breakpointWidth ?
                    <>
                        {/* Notifications */}
                        <div className="mx-2">
                            <Button onClick={openProfileModal} variant="outline-secondary" className="border-0">
                                <Icon path={mdiAccount} size="25" />
                            </Button>
                        </div>
                    </>
                    :
                    <>
                        <small className='mb-0 text-muted' title={moment(GlobalConfig.appVersionDate, 'DD/MM/YYYY').format('DD-MM-YYYY')}>v{GlobalConfig.appVersion}</small>
                    </>
                }
            </div>
        </div >
    )
}

export default MainSidebar;
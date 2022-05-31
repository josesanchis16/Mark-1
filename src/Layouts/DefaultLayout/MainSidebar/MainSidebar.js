import { mdiClose } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useEffect, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GlobalConfig } from '../../../Configuration';
import { getToggleSideBarAction } from '../../../Redux/Reducers/Config/Actions';
import store from '../../../Redux/store';
import NavSection from "./NavSection/NavSection";

const MainSidebar = ({ currentWidth }) => {

    const history = useHistory();
    const [pathName, setPathname] = useState('');

    useEffect(() => {
        setPathname(history.location.pathname)
        history.listen(e => {
            const { pathname } = e;
            setPathname(pathname);
        })
    }, [])

    const handleCloseClick = () => {
        store.dispatch(getToggleSideBarAction(false));
    }

    return (
        <div className="overflow-hidden bg-light">
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
                    <Navbar.Brand className="d-flex justify-content-center align-items-center w-100 h-100">
                        <h1 className="mb-0 h5 text-decoration-none text-muted">{GlobalConfig.appName}</h1>
                    </Navbar.Brand>
                </div>
            }


            <div className="bg-light mt-5 px-2">
                <NavSection active={pathName} />
            </div>
        </div >
    )
}

export default MainSidebar;
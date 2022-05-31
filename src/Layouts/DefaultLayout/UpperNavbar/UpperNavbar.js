import { mdiArrowLeft, mdiBell, mdiChevronDown, mdiMenu, mdiMessage } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GlobalConfig } from "../../../Configuration";
import { getToggleSideBarAction } from "../../../Redux/Reducers/Config/Actions";
import store from "../../../Redux/store";
import { equals, showModal } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";

const SCROLL_BREAKPOINT = 100;

const UpperNavbar = ({ currentWidth, titleOpacity }) => {

    const { goBack } = useHistory();

    const [currentPage, setCurrentPage] = useState('');

    const [showBackButton, setShowBackButton] = useState(false);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => updateFromStore());

        const updateFromStore = () => {
            const { currentPageTitle: currentPageTitleStore, showBackButton: showBackButtonStore } = store.getState().Config;

            if (!equals(currentPageTitleStore, currentPage)) {
                setCurrentPage(currentPageTitleStore);
            }

            if (!equals(showBackButton, showBackButtonStore)) {
                setShowBackButton(showBackButtonStore);
            }
        }
        return () => {
            unsubscribe();
        }
    }, [])

    const handleOpenMenu = () => {
        store.dispatch(getToggleSideBarAction(true));
    }

    const openProfileModal = () => {
        showModal(ModalNames.ProfileModal);
    }

    return (
        <div
            className="d-flex justify-content-between align-items-center bg-light"
            style={{ height: 80}}>
            <div className="d-flex justify-content-center align-items-center">
                <div>
                    {currentWidth < GlobalConfig.breakpointWidth &&
                        <div className="ps-2 ms-4" onClick={handleOpenMenu}>
                            <Icon path={mdiMenu} size="20" className="text-muted" />
                        </div>
                    }
                </div>
                <div className="ms-3 d-flex align-items-center justify-content-center " style={{ opacity: titleOpacity / SCROLL_BREAKPOINT > 1 ? 1 : titleOpacity / SCROLL_BREAKPOINT }} >
                    {showBackButton &&
                        <div className="me-3 cursor-pointer" onClick={() => goBack()}>
                            <Icon path={mdiArrowLeft} size="20" />
                        </div>
                    }
                    <p className="h3 mb-0 text-nowrap">{currentPage}</p>
                </div>
            </div>

            <div className="p-2 d-flex justify-content-end w-100 align-items-center">
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

                {/* Profile */}
                <div className="mx-2">
                    <div
                        onClick={openProfileModal}
                        className="btn btn-outline-secondary rounded-lg border-0">
                        <p className="mb-0">
                            Jose Sanchis
                            <Icon path={mdiChevronDown} style={{ marginTop: -2 }} size="20" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpperNavbar;
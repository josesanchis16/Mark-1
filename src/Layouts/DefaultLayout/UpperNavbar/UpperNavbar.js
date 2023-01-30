import { mdiArrowLeft, mdiChevronDown, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GlobalConfig } from "../../../Configuration";
import { getToggleSideBarAction } from "../../../Redux/Reducers/Config/Actions";
import store from "../../../Redux/store";
import { showModal } from "../../../Utils/GeneralFunctions";
import { ModalNames } from "../../../Utils/ModalNames";

const SCROLL_BREAKPOINT = 100;
const MD = 768;

const UpperNavbar = ({ currentWidth, titleOpacity }) => {

    const { goBack } = useHistory();

    const { name, lastname } = useSelector(state => state.User.profile);
    const { currentPageTitle, showBackButton } = useSelector(state => state.Config);

    const handleOpenMenu = () => {
        store.dispatch(getToggleSideBarAction(true));
    }

    const openProfileModal = () => {
        showModal(ModalNames.ProfileModal);
    }

    const calculateOpacity = () => {
        if ((titleOpacity / SCROLL_BREAKPOINT) > 1) return 1;
        else return titleOpacity / SCROLL_BREAKPOINT;
    }

    return (
        <div
            className={`d-flex justify-content-between align-items-center bg-${GlobalConfig.theme.mainLayout}`}
            style={{ height: 80 }}>
            <div className={`px-4 w-100 d-flex justify-content-between align-items-center `}>
                <div className="d-flex align-items-center justify-content-center ">
                    {showBackButton &&
                        <div
                            style={{ opacity: currentWidth < MD ? 1 : calculateOpacity() }}
                            className="me-3 cursor-pointer"
                            onClick={() => goBack()}>
                            <Icon path={mdiArrowLeft} size="20" />
                        </div>
                    }
                    <p
                        style={{ opacity: calculateOpacity() }}
                        className="h3 mb-0 text-nowrap">
                        {currentPageTitle}
                    </p>
                </div>
                <div>
                    {currentWidth < GlobalConfig.breakpointWidth &&
                        <Button variant="outline-secondary" onClick={handleOpenMenu} className="d-flex justify-content-center align-items-center border-0">
                            <Icon path={mdiMenu} size="20" />
                        </Button>
                    }
                </div>
            </div>

            {currentWidth >= GlobalConfig.breakpointWidth &&
                <div className="p-2 d-flex justify-content-end w-100 align-items-center">
                    {/* Profile */}
                    <div className="mx-2">
                        <Button
                            variant="outline-secondary" className="border-0" onClick={openProfileModal}>
                            <p className="mb-0">
                                {`${name || ''} ${lastname || ''}`}
                                <Icon path={mdiChevronDown} style={{ marginTop: -2 }} size="20" />
                            </p>
                        </Button>
                    </div>
                </div>
            }
        </div >
    )
}

export default UpperNavbar;
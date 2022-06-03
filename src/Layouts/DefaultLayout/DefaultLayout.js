import { Suspense, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CustomSuspense from "../../Components/CustomSuspense/CustomSuspense";
import { GlobalConfig } from "../../Configuration";
import ProfileModal from "../../Modal/ProfileModal/ProfileModal";
import store from "../../Redux/store";
import { equals } from "../../Utils/GeneralFunctions";
import MainSidebar from "./MainSidebar/MainSidebar";
import UpperNavbar from "./UpperNavbar/UpperNavbar";

const BREAKPOINT = GlobalConfig.breakpointWidth;

const DefaultLayout = ({ children }) => {

    const history = useHistory();

    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);

    const [titleOpacity, setTitleOpacity] = useState(0);

    useEffect(() => {
        const divEl = document.getElementById('mainContent');
        divEl.addEventListener('scroll', handleScroll);

        return () => {
            divEl.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        const historyListener = history.listen(e => {
            const mainCard = document.getElementById(`mainContent`);
            mainCard.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
        return historyListener;
    }, [])

    useEffect(() => {
        handleWidth();
        window.addEventListener('resize', handleWidth)
        return () => {
            window.removeEventListener('resize', handleWidth);
        }
    }, []);

    const handleWidth = (e) => {
        const { innerWidth, innerHeight } = window;
        setCurrentWidth(innerWidth);
        setCurrentHeight(innerHeight)
    }

    const handleScroll = (e) => {
        const { scrollTop } = e.target;
        setTitleOpacity(scrollTop);
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(() => updateFromStore());
        const updateFromStore = () => {
            const { sidebarOpened: sidebarOpenedStore } = store.getState().Config;
            if (!equals(sidebarOpenedStore, menuOpened)) {
                setMenuOpened(sidebarOpenedStore)
            }
        }

        updateFromStore();

        return () => {
            unsubscribe();
        }
    }, [menuOpened])

    return (
        <>
            {/* Modals */}
            <ProfileModal />

            {/* Content */}
            <Row>
                <Col
                    style={{
                        top: 0,
                        position: currentWidth < BREAKPOINT ? 'absolute' : 'sticky',
                        zIndex: 11,
                        transition: '0.3s',
                        height: currentWidth < BREAKPOINT ? menuOpened ? '100%' : '0' : currentHeight,
                    }}
                    className="px-0 overflow-hidden"
                    lg={{ span: currentWidth > 1500 ? currentWidth > 2000 ? 1 : 2 : 3 }}>
                    <MainSidebar currentWidth={currentWidth} />
                </Col>
                <Col
                    lg={{
                        span: currentWidth > 1500 ? currentWidth > 2000 ? 11 : 10 : 9,
                    }}
                    className="px-0 bg-light overflow-hidden">
                    <div className="sticky-top" style={{ zIndex: 10, boxShadow: '30px 1px 10px 0 #dedede' }}>
                        <UpperNavbar titleOpacity={titleOpacity} currentWidth={currentWidth} />
                    </div>
                    <div
                        id="mainContent"
                        className="bg-white overflow-auto px-4"
                        style={{ zIndex: 9, height: currentHeight - 80, borderTopLeftRadius: currentWidth < BREAKPOINT ? 0 : 35, boxShadow: 'inset 1px 1px 10px 0 #ddd' }}>
                        <Suspense fallback={(<CustomSuspense />)}>
                            <div style={{ height: 'calc(1000vh - 80px - 10px)' }}>
                                {children}
                            </div>
                        </Suspense >
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DefaultLayout;
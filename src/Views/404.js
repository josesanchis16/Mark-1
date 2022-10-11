import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../Routes";

const NotFound = () => {
    return (
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <p style={{ fontSize: '10rem', fontWeight: 100, lineHeight: '11rem' }} className="mb-0">404!</p>
            <b className="mb-0 h3">Nothing to see here</b>
            <Button size="sm" className="mt-4" as={Link} to={AppRoutes[0].path}>Go Home</Button>
        </div>
    )
}

export default NotFound;
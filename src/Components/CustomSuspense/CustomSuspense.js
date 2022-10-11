import { Spinner } from "react-bootstrap"

const CustomSuspense = ({ }) => {

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <Spinner animation="border" />
            <p className="mb-0">Loading...</p>
        </div>
    )
}

export default CustomSuspense
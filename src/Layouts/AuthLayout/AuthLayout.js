import { Suspense } from "react";
import CustomSuspense from "../../Components/CustomSuspense/CustomSuspense";

const AuthLayout = ({ children }) => {
    return (
        <Suspense fallback={(<CustomSuspense />)}>
            {children}
        </Suspense>
    )
}

export default AuthLayout;
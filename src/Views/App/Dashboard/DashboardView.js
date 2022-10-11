import CustomSuspense from "../../../Components/CustomSuspense/CustomSuspense";
import GeneralLayout from "../../../Layouts/InnerLayouts/GeneralLayout";


const DashboardView = () => {

    return (
        <GeneralLayout showBackButton title="Dashboard">
            <CustomSuspense />
        </GeneralLayout>
    )
}

export default DashboardView;
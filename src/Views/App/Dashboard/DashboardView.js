import useScript from "../../../Hooks/useScript";
import GeneralLayout from "../../../Layouts/InnerLayouts/CardLayout";


const DashboardView = () => {

    useScript(
        "http://todonow.josesanchisdev.es/modules/todonow.js",
        "F1286DBD-123B-4640-A221-F56E184186BF"
    )

    return (
        <GeneralLayout showBackButton title="Dashboard">
            <div id="main__div__container" guid=""></div>
        </GeneralLayout>
    )
}

export default DashboardView;
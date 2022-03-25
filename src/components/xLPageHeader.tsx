import {PageHeader} from "antd";

const XLPageHeader = (props:any) => {
    return (
        <PageHeader
            className="xLtheme-pageHeader"
            ghost={true}
            onBack={() => window.history.back()}
            title={props.title}
            subTitle={props.subTitle}
            extra={props.extra}
        />
    )
}

export default XLPageHeader;
import Sidebar from './common/Sidebar';

type LayoutOnlyHeader = {
    children: any;
};
function LayoutOnlySidebar(props: LayoutOnlyHeader) {
    const { children } = props;
    return (
        <div className="container">
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
}

export default LayoutOnlySidebar;

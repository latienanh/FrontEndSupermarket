import Header from './common/Header';

type LayoutOnlyHeader = {
    children: any;
};
function LayoutOnlyHeader(props: LayoutOnlyHeader) {
    const { children } = props;
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default LayoutOnlyHeader;

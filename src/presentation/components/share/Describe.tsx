import { EditorCustome } from '~/presentation/components/share';
type DescribeProps = {
    onClose: () => void;
    data: string | null;
};
function Describe(props: DescribeProps) {
    const { onClose, data } = props;
    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thông tin</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-body-content" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                <EditorCustome Value={data} Disabled={true}></EditorCustome>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onClose}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Describe;

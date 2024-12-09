import React from 'react';

type PaginationControlProps = {
    index: number;
    max: number;
    onClickNext: () => void;
    onClickPrev: () => void;
    onclickNumber: (indexP: number) => void;
};

const PaginationControl = (props: PaginationControlProps) => {
    const { index, max, onClickNext, onClickPrev, onclickNumber } = props;
    const indexPag = index + 1;

    return (
        <div className="card-footer border-top d-flex justify-content-center">
            {indexPag !== 1 && (
                <button
                    className="btn btn-falcon-default btn-sm me-2"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Prev"
                    onClick={onClickPrev}
                >
                    <span className="fas fa-chevron-left"></span>
                </button>
            )}
            <a
                className={`btn btn-sm btn-falcon-default y me-2 ${indexPag === 1 ? 'text-primary' : ''}`}
                onClick={() => onclickNumber(1)}
            >
                1
            </a>
            {indexPag > 2 && (
                <a className="btn btn-sm btn-falcon-default me-2" href="#!">
                    <span className="fas fa-ellipsis-h"></span>
                </a>
            )}
            {indexPag > 1 && indexPag < max && (
                <a
                    className={`btn btn-sm btn-falcon-default y me-2 text-primary`}
                    onClick={() => onclickNumber(indexPag)}
                >
                    {indexPag}
                </a>
            )}
            {indexPag < max - 1 && (
                <a className="btn btn-sm btn-falcon-default me-2" href="#!">
                    <span className="fas fa-ellipsis-h"></span>
                </a>
            )}
            <a
                className={`btn btn-sm btn-falcon-default me-2 ${indexPag === max ? 'text-primary' : ''}`}
                onClick={() => onclickNumber(max)}
                href="#!"
            >
                {max}
            </a>
            {indexPag !== max && (
                <button
                    className="btn btn-falcon-default btn-sm"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Next"
                    onClick={onClickNext}
                >
                    <span className="fas fa-chevron-right"></span>
                </button>
            )}
        </div>
    );
};

export default PaginationControl;

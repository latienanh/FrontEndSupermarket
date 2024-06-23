import imageAssets from '~/presentation/assets/images';
import { InputImageProps } from './typeShare';
import { ReactComponent as CloudUploadIcon } from '~/presentation/assets/img/icons/cloud-upload.svg';
import { ChangeEvent, useRef, useState } from 'react';
import { getFileSize } from '~/presentation/utils';
const InputImageCustome = (props: InputImageProps) => {
    const { Title, onChangeFile, removeFile, style } = props;
    const fileRef = useRef<HTMLInputElement | null>(null);
    const handleChangeInput = () => {
        fileRef.current?.click();
    };
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };
    return (
        <>
            <div className={style ? style : ''}>
                <div className="card mb-3 ">
                    <h6 className="bg-body-tertiary card-header">{Title}</h6>
                    <div className="card-body">
                        <div
                            // role="presentation"
                            className="dropzone dropzone-multiple p-0 "
                            id="my-awesome-dropzone"
                            data-dropzone="data-dropzone"
                        >
                            <div className="fallback">
                                <input
                                    className=""
                                    name="uploadedFiles"
                                    accept="image/*,.jpeg,.png,.jpg"
                                    multiple={false}
                                    type="file"
                                    tabIndex={-1}
                                    style={{ display: 'none' }}
                                    onChange={(event) => {
                                        handleFileChange(event);
                                        onChangeFile(event);
                                    }}
                                    ref={fileRef}
                                />
                            </div>
                            <div
                                className="dz-message"
                                data-dz-message="data-dz-message"
                                onClick={handleChangeInput}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <div>
                                    <CloudUploadIcon style={{ width: 25 }} className="me-2" />
                                    <span className="d-none d-lg-inline">
                                        Drag your image here
                                        <br />
                                        or,{' '}
                                    </span>
                                    <button type="button" className="p-0 fs-10 btn btn-link btn-sm">
                                        Browse
                                    </button>
                                </div>
                            </div>
                            {file != null && (
                                <div className="dz-preview dz-preview-multiple m-0 d-flex flex-column">
                                    <div className="d-flex media align-items-center mb-3 pb-3 border-bottom btn-reveal-trigger">
                                        <img
                                            className="dz-image"
                                            src={imageUrl ? imageUrl : ''}
                                            alt="..."
                                            data-dz-thumbnail="data-dz-thumbnail"
                                        />
                                        <div className="flex-1 d-flex flex-between-center">
                                            <div>
                                                <h6 data-dz-name="data-dz-name">{file.name}</h6>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 fs--1 text-400 lh-1" data-dz-size="data-dz-size">
                                                        {getFileSize(file.size)}
                                                    </p>
                                                    <div className="dz-progress">
                                                        <span className="dz-upload" data-dz-uploadprogress=""></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dropdown font-sans-serif">
                                                <button
                                                    className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal dropdown-caret-none"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <span className="fas fa-ellipsis-h"></span>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end border py-2">
                                                    <a
                                                        className="dropdown-item"
                                                        href="#!"
                                                        data-dz-remove="data-dz-remove"
                                                        onClick={() => {
                                                            setFile(null);
                                                            setImageUrl(null);
                                                            removeFile();
                                                        }}
                                                    >
                                                        Remove File
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default InputImageCustome;

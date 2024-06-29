import { Button, Checkbox } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorAttribute } from '~/application/model/modelErrorRequest/ErrorEntity';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { AttributeRequest } from '~/application/model/modelRequest/AttributeModelRequest';
import { AttributeService } from '~/application/redux/slide/AttributeSlide';

function AddAttribute() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const attributeState = useSelector((state: RootState) => state.attribute);
    const dispatch = useDispatch<AppDispatch>();

    const [attributeCreate, setattributeCreate] = useState<AttributeRequest>({
        name: '',
    });
    const [errors, setErrors] = useState<ErrorAttribute>({});
    const navigate = useNavigate();
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!attributeCreate?.name) {
            handleError('Vui lòng nhập tên thuộc tính !', 'name');
            isValid = false;
        } else if (attributeCreate.name.length < 5 && attributeCreate.name.length > 50) {
            handleError('Tên thuộc tính phải trên 5 và ít hơn 50 kí tự !', 'name');
            isValid = false;
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(AttributeService.fetchCreate(attributeCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!attributeState.isLoading) {
            if (hasEditDataChanged) {
                if (!attributeState.isError && attributeState.dataCreate) {
                    toast.success(attributeState.dataCreate.message);
                    navigate(URL_APP.Attribute);
                } else if (attributeState.isError && attributeState.dataCreate) {
                    toast.error(attributeState.dataCreate.message);
                }
            }
        }
    }, [attributeState.dataCreate]);
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setattributeCreate((prevState) => ({ ...prevState, name: value }));
    };

    return (
        <>
            {attributeState.isLoading && !attributeState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">attribute</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">attribute</a>
                            </li>
                            <li className="breadcrumb-item active">Add attribute</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New attribute</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="news-content-right pd-20">
                                            <div className="row">
                                                <InputCustome
                                                    Title="Tên đăng nhập"
                                                    Type="text"
                                                    AutoComplete="on"
                                                    Id="card-name"
                                                    onChange={handleChangeName}
                                                    Error={errors.name}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                            </div>
                                            <ButtonCustome
                                                Title="Thêm thuộc tính"
                                                BackgroundColor="#36ef84"
                                                HoverColor="#25a35a"
                                                onClick={() => {
                                                    validate();
                                                }}
                                                Icon="fa-solid fa-plus"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

export default AddAttribute;

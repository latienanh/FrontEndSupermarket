import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorAttribute } from '~/application/model/modelErrorRequest/ErrorEntity';

import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';

import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { AttributeRequest } from '~/application/model/modelRequest/AttributeModelRequest';
import { AttributeService } from '~/application/redux/slide/AttributeSlide';

function UpdateAttribute() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const attributeState = useSelector((state: RootState) => state.attribute);
    const dispatch = useDispatch<AppDispatch>();
    const [attributeUpdate, setattributeUpdate] = useState<AttributeRequest>({
        name: '',
    });
    const [errors, setErrors] = useState<ErrorAttribute>({});

    useEffect(() => {
        dispatch(fetchAllRole());
        if (id !== undefined) {
            dispatch(AttributeService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setattributeUpdate((prevState) => ({
            ...prevState,
            name: attributeState.dataGetAttributeById.DataSuccess?.data.name || '',
        }));
        console.log(attributeUpdate);
    }, [attributeState.dataGetAttributeById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!attributeUpdate?.name) {
            handleError('Vui lòng nhập tên thuộc tính !', 'name');
            isValid = false;
        } else if (attributeUpdate.name.length < 5 && attributeUpdate.name.length > 50) {
            handleError('Tên thuộc tính phải trên 5 và ít hơn 50 kí tự !', 'name');
            isValid = false;
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            if (id !== undefined) {
                const payload = {
                    id: id,
                    model: attributeUpdate,
                };
                dispatch(AttributeService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!attributeState.isLoading) {
            if (!attributeState.isError && attributeState.dataUpdate) {
                if (hasEditDataChanged) {
                    toast.success(attributeState.dataUpdate.message);
                    navigate(URL_APP.Attribute);
                }
            } else if (attributeState.isError && attributeState.dataUpdate) {
                toast.error(attributeState.dataUpdate.message);
            }
        }
    }, [attributeState.dataUpdate]);

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setattributeUpdate((prevState) => ({ ...prevState, name: value }));
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
                                <a href="category.html">Attribute</a>
                            </li>
                            <li className="breadcrumb-item active">Add Attribute</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New Attribute</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="news-content-right pd-20">
                                            <div className="row">
                                                <InputCustome
                                                    Title="Tên thuộc tính"
                                                    Type="name"
                                                    AutoComplete="on"
                                                    Id="card-name"
                                                    onChange={handleChangeName}
                                                    Value={attributeUpdate.name}
                                                    Error={errors.name}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                            </div>
                                            <ButtonCustome
                                                Title="Sửa thuộc tính"
                                                BackgroundColor="#3caffb"
                                                HoverColor="#2a7aaf"
                                                onClick={() => {
                                                    validate();
                                                }}
                                                Icon=" fa-solid fa-pen-to-square"
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

export default UpdateAttribute;

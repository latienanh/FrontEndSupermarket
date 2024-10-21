import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorMemberShipType } from '~/application/model/modelErrorRequest/ErrorEntity';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { ButtonCustome, InputCustome, InputImageCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { validateEmail, validateNumberPhone } from '~/presentation/utils';
import { LoadingAuth } from '../../loading';
import { Role } from '~/domain/entities/supermarketEntities/Role';
import { MemberShipTypeRequest } from '~/application/model/modelRequest/MemberShipTypeMR';
import { MemberShipTypeService } from '~/application/redux/slide/MemberShipTypeSlide';

function UpdateMemberShipType() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const memberShipTypeState = useSelector((state: RootState) => state.memberShipType);
    const dispatch = useDispatch<AppDispatch>();
    const [memberShipTypeUpdate, setmemberShipTypeUpdate] = useState<MemberShipTypeRequest>({
        id: id,
        name: '',
    });
    const [errors, setErrors] = useState<ErrorMemberShipType>({});
    useEffect(() => {
        dispatch(fetchAllRole());
        if (id !== undefined) {
            dispatch(MemberShipTypeService.fetchGetById(id));
        }
    }, []);
    useEffect(() => {
        setmemberShipTypeUpdate((prevState) => ({
            ...prevState,
            name: memberShipTypeState.dataGetMSTById.DataSuccess?.data.name || '',
        }));
        console.log(memberShipTypeUpdate);
    }, [memberShipTypeState.dataGetMSTById]);

    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!memberShipTypeUpdate?.name) {
            handleError('Vui lòng nhập tên loại khách !', 'name');
            isValid = false;
        } else if (memberShipTypeUpdate.name.length < 5 && memberShipTypeUpdate.name.length > 50) {
            handleError('Tên loại khách phải trên 5 và ít hơn 50 kí tự !', 'name');
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
                    model: memberShipTypeUpdate,
                };
                dispatch(MemberShipTypeService.fetchUpdate(payload));
                setHasEditDataChanged(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!memberShipTypeState.isLoading) {
            if (!memberShipTypeState.isError && memberShipTypeState.dataUpdate) {
                if (hasEditDataChanged) {
                    toast.success(memberShipTypeState.dataUpdate.message);
                    navigate(URL_APP.MemberShipType);
                }
            } else if (memberShipTypeState.isError && memberShipTypeState.dataUpdate) {
                toast.error(memberShipTypeState.dataUpdate.message);
            }
        }
    }, [memberShipTypeState.dataUpdate]);
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setmemberShipTypeUpdate((prevState) => ({ ...prevState, name: value }));
    };
    return (
        <>
            {memberShipTypeState.isLoading && !memberShipTypeState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">memberShipType</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">memberShipType</a>
                            </li>
                            <li className="breadcrumb-item active">Add memberShipType</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New memberShipType</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="news-content-right pd-20">
                                            <div className="row">
                                                <InputCustome
                                                    Title="Email"
                                                    Type="email"
                                                    AutoComplete="on"
                                                    Id="card-email"
                                                    onChange={handleChangeName}
                                                    Value={memberShipTypeUpdate.name}
                                                    Error={errors.name}
                                                    style="col-lg-6 mt-3 mb-3"
                                                />
                                            </div>
                                            <ButtonCustome
                                                Title="Sửa thể loại khách"
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

export default UpdateMemberShipType;

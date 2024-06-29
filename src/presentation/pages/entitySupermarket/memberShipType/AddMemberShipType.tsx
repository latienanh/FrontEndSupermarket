import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorMemberShipType } from '~/application/model/modelErrorRequest/ErrorEntity';
import { AppDispatch, RootState } from '~/application/redux/rootState';
import { fetchAllRole } from '~/application/redux/slide/RoleSlide';
import { MemberShipTypeService } from '~/application/redux/slide/MemberShipTypeSlide';
import { ButtonCustome, InputCustome } from '~/presentation/components/share';
import { URL_APP } from '~/presentation/router/Link';
import { LoadingAuth } from '../../loading';
import { MemberShipTypeRequest } from '~/application/model/modelRequest/MemberShipTypeMR';

function AddMemberShipType() {
    const [hasEditDataChanged, setHasEditDataChanged] = useState(false);
    const memberShipTypeState = useSelector((state: RootState) => state.memberShipType);
    const dispatch = useDispatch<AppDispatch>();

    const [memberShipTypeCreate, setMemberShipTypeCreate] = useState<MemberShipTypeRequest>({
        name: '',
    });
    const [errors, setErrors] = useState<ErrorMemberShipType>({});
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchAllRole());
    }, []);
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    const validate = () => {
        let isValid = true;
        if (!memberShipTypeCreate?.name) {
            handleError('Vui lòng nhập tên loại khách!', 'name');
            isValid = false;
        } else if (memberShipTypeCreate.name.length > 50) {
            handleError('Tên loại khách dưới 50 kí tự !', 'name');
            isValid = false;
        }
        if (isValid) {
            regisiter();
        }
    };
    const regisiter = async () => {
        try {
            dispatch(MemberShipTypeService.fetchCreate(memberShipTypeCreate));
            setHasEditDataChanged(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!memberShipTypeState.isLoading) {
            if (hasEditDataChanged) {
                if (!memberShipTypeState.isError && memberShipTypeState.dataCreate) {
                    toast.success(memberShipTypeState.dataCreate.message);
                    navigate(URL_APP.MemberShipType);
                } else if (memberShipTypeState.isError && memberShipTypeState.dataCreate) {
                    toast.error(memberShipTypeState.dataCreate.message);
                }
            }
        }
    }, [memberShipTypeState.dataCreate]);
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleError('', 'name');
        setMemberShipTypeCreate((prevState) => ({ ...prevState, name: value }));
    };

    return (
        <>
            {memberShipTypeState.isLoading && !memberShipTypeState.isError ? (
                <LoadingAuth />
            ) : (
                <main>
                    <div className="container-fluid">
                        <h2 className="mt-30 page-title">MemberShipType</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="category.html">MemberShipType</a>
                            </li>
                            <li className="breadcrumb-item active">Add MemberShipType</li>
                        </ol>
                        <div className="row">
                            <div className="col-lg col-md-7 ">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>Add New MemberShipType</h4>
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
                                                    style="col-lg-12 mt-3 mb-3"
                                                />
                                            </div>
                                            <ButtonCustome
                                                Title="Thêm tên loại khách hàng"
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

export default AddMemberShipType;

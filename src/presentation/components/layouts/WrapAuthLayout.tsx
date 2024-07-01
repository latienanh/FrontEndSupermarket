import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '~/application/redux/rootState';
import { URL_APP } from '~/presentation/router/Link';

type WarpAuthProps = {
    children: React.ReactNode;
};

const WrapAuthLayout = (props: WarpAuthProps) => {
    const { children } = props;
    // const navigation = useNavigate();
    // const authState = useSelector((state: RootState) => {
    //     state.auth.login.DataSuccess?.data;
    // });
    // useEffect(() => {
    //     if (authState == null) {
    //         navigation(URL_APP.Login);
    //     }
    // }, []);
    return <>{children}</>;
};

export { WrapAuthLayout };

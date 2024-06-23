import { useSelector } from 'react-redux';
import { RootState } from '~/application/redux/rootState';

const useAuthToken = (): string | undefined => {
    return useSelector((state: RootState) => state?.auth?.login?.DataSuccess?.data?.accessToken);
};

export default useAuthToken;

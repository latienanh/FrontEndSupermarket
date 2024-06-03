import { ReactNode } from 'react';
import imageAssets from '~/assets/images';
import '~/assets/css/theme.min.css';
import '~/assets/vendor/fontawesome-free/css/all.min.css';

type WrapAuthProps = {
    children: ReactNode;
};
function WrapAuth(props: WrapAuthProps) {
    const { children } = props;
    return (
        <>
            <main className="main" id="top">
                <div className="container-fluid">
                    <div className="row min-vh-100 flex-center g-0">
                        <div className="col-lg-8 col-xxl-5 py-3 position-relative ">
                            <img className="bg-auth-circle-shape" src={imageAssets.bgShape} alt="" width="250px" />
                            <img className="bg-auth-circle-shape-2" src={imageAssets.shape1} alt="" width="150px" />
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default WrapAuth;

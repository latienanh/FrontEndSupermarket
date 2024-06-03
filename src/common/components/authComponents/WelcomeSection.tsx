import imageAssets from '~/assets/images';

function WelcomeSection() {
    return (
        <>
            <div className="position-relative p-4 pt-md-5 pb-md-7" data-bs-theme="light">
                <div
                    className="bg-holder bg-auth-card-shape"
                    style={{
                        backgroundImage: `url(${imageAssets.half_circle})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: '100%',
                    }}
                ></div>

                <div className="z-1 position-relative">
                    <div className="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder">
                        LTA Supermarket Manager
                    </div>
                    <p className="opacity-75 text-white">
                        Chào mừng đến với Web Supermarket Manager! Chúng tôi cung cấp giải pháp quản lý siêu thị hiệu
                        quả . Hãy để chúng tôi giúp bạn tối ưu hóa kinh doanh của bạn!
                    </p>
                </div>
            </div>
        </>
    );
}

export default WelcomeSection;

import '~/presentation/assets/css/loading.css';
function LoadingAuth() {
    return (
        <main className="main" id="top">
            <div className="container-fluid">
                <div className="row min-vh-100 flex-center g-0">
                    <div className="loader"></div>
                </div>
            </div>
        </main>
    );
}

export default LoadingAuth;

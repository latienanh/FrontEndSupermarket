import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { privateRouter, publicRouter } from './presentation/router';
import Home from './presentation/pages/home';
import { AddProduct } from './presentation/pages/entitySupermarket';
import { LoadingAuth } from './presentation/pages/loading';
import { useAuthToken } from './presentation/utils';
import { jwtDecode } from 'jwt-decode';

function App() {
    // const token = useAuthToken();
    // const decodeToken = token ? jwtDecode(token)
    // const jsonToken = JSON.parse(decodeToken)
    return (
        <Router>
            <Routes>
                {publicRouter.map((router, index) => {
                    const Layout = router.layout === null ? Fragment : router.layout;
                    const Page = router.component;
                    // console.log(Page);
                    return (
                        <Route
                            key={index}
                            path={router.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        >
                            <Route path={`${router.path}/loading`} element={<LoadingAuth />} />
                        </Route>
                    );
                })}
                {privateRouter.map((router, index) => {
                    const Layout = router.layout === null ? Fragment : router.layout;
                    const Page = router.component;
                    return (
                        <Route
                            key={index}
                            path={router.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        >
                            <Route path={`${router.path}/loading`} element={<LoadingAuth />} />
                        </Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;

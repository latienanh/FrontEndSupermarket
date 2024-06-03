import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { privateRouter, publicRouter } from './router';
import Home from './pages/home';
import { AddProduct } from './pages/entitySupermarket';
import { LoadingAuth } from './pages/loading';

function App() {
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
            </Routes>
        </Router>
    );
}

export default App;

const { override, useBabelRc, addWebpackResolve } = require('customize-cra');
module.exports = override(
    useBabelRc(),
    // addWebpackResolve({
    //     fallback: {
    //         fs: false,
    //     },
    // }),
);

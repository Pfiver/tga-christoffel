module.exports = {
    entry: {
        bundle: "./script"
    },
    output: {
        filename: "[name].js",
        path: require('path').resolve(__dirname, '.')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', {
                            debug: true,
                            targets: {
                                // browsers: ["last 2 versions", "> 1%"]
                                // as of 2017-04-14, gives:
                                "chrome": 49,
                                "edge": 14,
                                "firefox": 51,
                                "ie": 10,
                                "ios": 10,
                                "safari": 10
                            }
                        }]],
                        plugins: ['transform-runtime'],
                        // cacheDirectory: true
                    },
                }]
            }
        ]
    },
    plugins: [
        // new (require('webpack-closure-compiler'))({
        //     compiler: {
        //     //     language_in: 'ECMASCRIPT6',
        //     //     language_out: 'ECMASCRIPT5',
        //     //     compilation_level: 'ADVANCED'
        //     },
        //     // concurrency: 3,
        // })
    ]
};

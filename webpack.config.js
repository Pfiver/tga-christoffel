const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ClosureCompilerPlugin = require("webpack-closure-compiler");

module.exports = [{

    entry: {
        site: [
            "./script.js",
            "./style.less",
            "file-loader?name=[path][name].[ext]!./calendar-data.xml"
        ]
    },

    output: {
        filename: "script.js",
        library: [ "ScriptBundle" ],
        path: require("path").resolve(__dirname, "target")
    },

    devtool: "source-map" || "cheap-module-eval-source-map",

    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]"
                    }
                }
            },
            {
                test: /\.(gif|jpg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]"
                    }
                }
            },
            {
                test: /\.json$/,
                use: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:  [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env", {
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
                            }]
                        ],
                        plugins: ['transform-runtime'],
                        // cacheDirectory: true
                    },
                }]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    // url: false,
                                    // import: false,
                                    minimize: false,
                                    sourceMap: false,
                                    // minimize: { discardComments: { removeAll: true } },
                                }
                            },
                            // "./custom-css-loader",
                            {
                                loader: "less-loader",
                                options: {
                                    compress: false,
                                    // sourceMap: false,
                                    // sourceMap: {
                                    //     outputSourceFiles: true,
                                    //     sourceMapFileInline: true
                                    // },
                                }
                            }
                        ]
                    }
                )
            }
        ]
    },
    plugins: [

        new ExtractTextPlugin({
            filename: "style.css"
        }),

        // breaks source-maps for some reason
        // new ClosureCompilerPlugin({
        //     compiler: {
        //     //     language_in: "ECMASCRIPT6",
        //     //     language_out: "ECMASCRIPT5",
        //     //     compilation_level: "ADVANCED"
        //     },
        //     // concurrency: 3,
        // }),

        // new (require("webpack")).DefinePlugin({
        //     "process.env": {
        //         "NODE_ENV": JSON.stringify("production")
        //     }
        // }),
    ]
}];

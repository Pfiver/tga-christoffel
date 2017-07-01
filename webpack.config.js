import { default as path } from "path";
import { ConcatSource, SourceMapDevToolPlugin } from "webpack";
import { default as ClosureCompilerPlugin } from "webpack-closure-compiler";

const dir = rel_path => path.resolve(__dirname, rel_path);

const files = [
    "./calendar-data.xml",
    "./Situationsplan.pdf",
    "./Vertragsbedingungen 2017.pdf"
];

const sitedir = dir("target/site");

// noinspection PointlessBooleanExpressionJS
const devtool = false; // "source-map" || "inline-source-map" || "cheap-module-eval-source-map";

const jsConfig = {

    entry: "./script.js",
    output: { path: sitedir, filename: "script.js" },

    devtool: devtool,

    module: {
        rules: [
            {
                test: /\.json$/,
                use: "json-loader"
            },
            {
                test: /\.js$/,
                include: dir("node_modules"),
                use:  [{
                    loader: "babel-loader",
                    options: {
                        comments: false
                    },
                }]
            },
            {
                test: /\.js$/,
                exclude: dir("node_modules"),
                use:  [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env", {
                                // debug: true,
                                targets: {
                                    browsers: ["last 2 versions", "> 1%"]
                                    // as of 2017-05-28, gives:
                                    // "android": 4,
                                    // "chrome": 49,
                                    // "edge": 14,
                                    // "firefox": 52,
                                    // "ie": 10,
                                    // "ios": 10,
                                    // "safari": 10
                                }
                            }]
                        ],
                        comments: false,
                        // cacheDirectory: true,
                        plugins: ["transform-runtime"]
                    },
                }]
            },
        ]
    },
    plugins: [

        new ClosureCompilerPlugin({
            compiler: {
            //     language_in: "ECMASCRIPT6",
            //     language_out: "ECMASCRIPT5",
            //     compilation_level: "ADVANCED"
            },
            // concurrency: 3,
        }),

        // new SourceMapDevToolPlugin({
        //     sourceRoot: "../",
        //     filename: "script.js.map",
        //     moduleFilenameTemplate: info => info.absoluteResourcePath.substring(__dirname.length+1),
        // })
    ]
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyle = new ExtractTextPlugin({ filename: "style.css" });
const suppressChunkAssets = {
    apply: compiler => compiler.plugin("this-compilation",
        compilation => compilation.plugin("should-generate-chunk-assets", () => false))
};

const cssConfig = {

    entry: "./style.less",
    output: { path: sitedir, filename: "n/a" },

    devtool: devtool,

    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({use:[
                // use: [
                    {
                        loader: "css-loader",
                        options: {
                            // url: false,
                            // import: false,
                            minimize: false,
                            sourceMap: true,
                            // minimize: { discardComments: { removeAll: true } },
                        }
                    },
                    "./custom-css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            compress: false,
                            sourceMap: true,
                            // sourceMap: {
                            //     outputSourceFiles: true,
                            //     sourceMapFileInline: true
                            // },
                        }
                    }
                ]})
                // ]
            },
            {
                test: /\.(eot|svg|ttf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000
                        // name: "[path][name].[ext]"
                    }
                }
            },
            {
                test: /\.(gif|jpg|png)$/,
                exclude: dir("photos"),
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000
                        // name: "[path][name].[ext]"
                    }
                }
            },
            {
                test: dir("photos"),
                use: {
                    loader: "file-loader", // pass-thru dummy
                    options: {
                        emitFile: false,
                        name: "[path][name].[ext]"
                    }
                }
            }
        ]
    },

    plugins: [ extractStyle, suppressChunkAssets ]
};

const filesConfig = {
    entry: files,
    output: { path: sitedir, filename: "n/a" },
    module: { rules: [{ use: "file-loader?name=[name].[ext]" }]},
    plugins: [ suppressChunkAssets ]
};

const htmlConfig = {
    entry: "./target/index.html",
    output: { path: sitedir, filename: "n/a" },
    module: { rules: [
        { use: [
                "file-loader?name=[name].[ext]",
                {
                    loader: "htmlmin-loader",
                    options: {
                        maxLineLength: 500,
                    }
                }
            ]
        }
    ]},
    plugins: [ suppressChunkAssets ]
};

module.exports = [ jsConfig, cssConfig, filesConfig, htmlConfig ];

const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test:/\.(jpg|svg|png|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1000000,
                            outputPath:'images'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new HtmlWebPackPlugin({
            template: "./src/form.html",
            filename: "./form.html"
        }),
        new HtmlWebPackPlugin({
            template: "./src/result.html",
            filename: "./result.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs')
    }
};

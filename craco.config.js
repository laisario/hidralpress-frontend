module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.optimization.splitChunks = {
                chunks: "all"
            };
            webpackConfig.module.rules = [
                ...webpackConfig.module.rules,
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                        },
                    ],
                }
            ]
            return webpackConfig;
        }
    }
}
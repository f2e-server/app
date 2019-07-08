const tsImportPluginFactory = require('ts-import-plugin')


module.exports = [{
    output: {
        filename: 'static/bundle.js'
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.[jte]sx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory( /** options */)]
                    })
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    entry: './src/index.tsx',
}];
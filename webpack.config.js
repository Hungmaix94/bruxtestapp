const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.watchOptions = {
        ignored: /node_modules/
    };
    config.plugins = config.plugins.concat(
        [
            new MergeJsonWebpackPlugin({
                output: {
                    groupBy: [
                        { pattern: './i18n/en/*.json', fileName: './locales/i18n/en.json' },
                        { pattern: './i18n/pl/*.json', fileName: './locales/i18n/pl.json' },
                    ],
                },
            }),
        ]
    );
    return config;
};
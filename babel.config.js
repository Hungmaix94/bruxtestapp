module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ["module:react-native-dotenv", {
                "moduleName": "@env",
            }],

            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    root: ['./src'],
                    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.scss','.png'],
                    alias: {
                        src: ['./src/'],
                    }
                }
            ],
            "react-native-classname-to-style",
            [
                "react-native-platform-specific-extensions",
                {extensions: ["scss", "sass"]}
            ]

        ],
    };
};

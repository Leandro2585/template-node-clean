module.exports = {

  ignore: [
    'src/**/*.test.ts', 'build/**/*.test.js',
    'src/**/*.spec.ts', 'build/**/*.spec.js'
  ],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@data/*': './src/modules',
        '@domain/*': './src/config',
        '@infra/*': './src/infra',
        '@main/*': './src/main',
        '@shared/*': './src/shared'
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
}

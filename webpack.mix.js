let mix = require('laravel-mix')

mix
  .setPublicPath('dist')
  .js('resources/js/tool.js', 'js')
  .sass('resources/sass/tool.scss', 'css')

// const WebpackShellPlugin = require('webpack-shell-plugin')

// mix.webpackConfig(webpack => {
//     return {
//         plugins: [
//             new WebpackShellPlugin({
//                 onBuildStart: [],
//                 onBuildEnd: [
//                     'cd ../../ && php artisan combine:nova-tools'
//                 ]
//             })
//         ]
//     }
// })


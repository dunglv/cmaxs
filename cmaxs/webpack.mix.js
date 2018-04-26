let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .babel([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'node_modules/select2/dist/js/select2.full.min.js',
        'resources/assets/js/common/jquery.function.js',
        'resources/assets/js/common/Events.js',
        'resources/assets/js/common/App.js',
        'resources/assets/js/common/layout.js',
        'resources/assets/js/common/UrlConstant.js',
        'resources/assets/js/common/MSG.js'
    ], 'public/js/vendor.js')
    .babel([
        'node_modules/jquery-ui/ui/widgets/datepicker.js',
        'node_modules/jquery-ui/ui/i18n/datepicker-ja.js',
        'node_modules/jquery-pjax/jquery.pjax.js',
        'resources/assets/js/common/date-picker.js',
        'resources/assets/js/common/mustache.min.js',
        'resources/assets/js/common/jquery.alphanum.js',
        'resources/assets/js/common/moment.js',
        'resources/assets/js/common/moment-ja.js',
        'node_modules/trumbowyg/dist/trumbowyg.min.js',
        'node_modules/trumbowyg/dist/plugins/colors/trumbowyg.colors.min.js',
        'node_modules/trumbowyg/dist/langs/ja.min.js',
        'resources/assets/js/common/editor.js',
        'resources/assets/js/common/bootstrap-datetimepicker.min.js',
        'resources/assets/js/image64-upload.js'
    ], 'public/js/content.js')
    
    .sass('resources/assets/sass/vendor.scss', 'public/css')
    .sass('resources/assets/sass/app.scss', 'public/css');

   

// Karma configuration
// Generated on Mon Aug 04 2014 21:17:04 GMT-0400 (EDT)

module.exports = function(config) {
    config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised'],

    // list of files / patterns to load in the browser
    files: [
      '../static/lib/jquery/dist/jquery.min.js',
      '../static/lib/angular/angular.js',
      '../static/lib/angular-route/angular-route.js',
      '../static/lib/angular-resource/angular-resource.js',
      '../static/lib/angular-cookies/angular-cookies.js',
      '../static/lib/angular-sanitize/angular-sanitize.min.js',
      '../static/lib/angular-md5/angular-md5.min.js',
      '../static/lib/angular-codemirror/lib/AngularCodeMirror.js',
      '../static/lib/timezone-js/src/date.js',
      '../static/lib/angular-tz-extensions/packages/jstimezonedetect/jstz.min.js',
      '../static/lib/underscore/underscore.js',
      '../static/lib/rrule/lib/rrule.js',
      '../static/lib/rrule/lib/nlp.js',
      '../static/lib/angular-tz-extensions/lib/angular-tz-extensions.js',
      '../static/lib/angular-scheduler/lib/angular-scheduler.min.js',
      '../static/lib/jqueryui/ui/minified/jquery-ui.min.js',
      '../static/lib/bootstrap/dist/js/bootstrap.min.js',
      '../static/lib/js-yaml/dist/js-yaml.min.js',
      '../static/lib/select2/select2.min.js',
      '../static/lib/jsonlint/lib/jsonlint.js',
      '../static/lib/codemirror/lib/codemirror.js',
      '../static/lib/codemirror/mode/javascript/javascript.js',
      '../static/lib/codemirror/mode/yaml/yaml.js',
      '../static/lib/codemirror/addon/lint/lint.js',
      '../static/lib/codemirror/addon/lint/json-lint.js',
      '../static/lib/angular-codemirror/lib/yaml-lint.js',
      '../static/lib/codemirror/addon/edit/closebrackets.js',
      '../static/lib/codemirror/addon/edit/matchbrackets.js',
      '../static/lib/codemirror/addon/selection/active-line.js',
      '../static/lib/scrollto/lib/jquery-scrollto.js',
      '../static/lib/socket.io-client/dist/socket.io.min.js',
      '../static/lib/d3js/build/d3.v3.min.js',
      '../static/lib/novus-nvd3/nv.d3.min.js',
      '../static/lib/d3Donut/d3Donut.js',
      '../static/lib/jPushMenu/jPushMenu.js',
      '../static/lib/lrInfiniteScroll/lrInfiniteScroll.js',
      '../static/lib/ansible/*.js',
      '../static/js/config.js',
      '../static/js/directives/dashboard-graphs.js',
      '../static/js/*/*.js',
      '../static/js/app.js',
      '../static/lib/angular-mocks/angular-mocks.js',
      '../../../node_modules/ng-midway-tester/src/ngMidwayTester.js',
      './unit/*',
      './unit/**/*'
    ],


    // list of files to exclude
    exclude: [
      '../static/js/awx.min.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'progress'],

    client: {
      mocha: {
        ui: 'bdd'
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false

    });
};
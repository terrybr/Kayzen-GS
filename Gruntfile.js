/******************************************************************
 * Kayzen-GS
 * Grunt Setup
 * @uthor [@esr360](http://twitter.com/esr360)
 ******************************************************************/

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        /**
         * Clean
         * @see https://github.com/gruntjs/grunt-contrib-clean
         */
        clean: {
            dist: {
                src: 'dist'
            }
        },
 
        /**
         * Concat
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        concat: {   
            app: {
                src: [
                    'vendor/Sass-Boost/dist/_sass-boost.scss',
                    'src/lib/utilities/*',
                    'src/_config.scss',
                    'src/lib/tools/*',
                    'src/lib/column-types/**/*',
                    'src/core/**/*',
                    'src/lib/semantic-gs/*'
                ],
                dest: 'dist/kayzen-gs.scss',
            }
        },
      
        /**
         * Sass
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        sass: {
            options: {
                sourcemap: 'none',
            },
            dev: {
                files: {
                    'dist/kayzen-gs.css': 'src/kayzen-gs.scss'
                },
                options: {
                    style: 'expanded'
                }
            },
            prod: {
                files: {
                    'dist/kayzen-gs.min.css': 'src/kayzen-gs.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        },
      
        /**
         * PostCSS
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: [
                            'last 2 versions', 
                            'ie >= 9'
                        ]
                    })
                ]
            },
            build: {
                src: 'dist/*.css'
            }
        },
      
        /**
         * ScssLint
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        scsslint: {
            allFiles: [
                'src/core/**/*.scss',
                'src/lib/**/*.scss',
                '_config.scss',
            ],
            options: {
                configFile: '.scss-lint.yml',
                colorizeOutput: true
            },
        },
      
        /**
         * SassDoc
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        sassdoc: {
            default: {
                src: 'src',
                options: {
                    dest: 'docs'
                }
            },
        },
      
        /**
         * Mocha
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        mochacli: {
            all: ['unit-testing/tests.js']
        },
      
        /**
         * Watch
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        watch: {
            css: {
                files: [
                    'src/**/*.scss'
                ],
                tasks: [
                    'sass', 
                    'sassdoc',
                    'notify:css'
                ],
                options: {
                    spawn: false,
                }
            }
        },
      
        /**
         * Notify
         * @see https://github.com/SassDoc/grunt-sassdoc
         */
        notify: {
            css: {
                options: {
                    title: 'Styles Compiled',
                    message: 'All styles have been successfully compiled!'
                }
            },
            app: {
                options: {
                    title: 'App Built',
                    message: 'Your app has been successfully built!'
                }
            }
        }

    });
      
    /**
     * Load NPM tasks
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sassdoc');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-notify');
      
    /**
     * Register Tasks
     */

    grunt.registerTask('default', [
        'compile',
        'watch'
    ]);

    grunt.registerTask('compile', [
        'scsslint',
        'mochacli',
        'clean',
        'concat',
        'sass',
        'postcss',
        'sassdoc',
        'notify:app'
    ]);

};
/* jshint node: true */
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            '* <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>\n' +
            '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '*/\n',

        // Task configuration.

        less: {

            core: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    report: 'min',
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'dist/<%= pkg.name %>.css.map'
                },
                files: {
                    'dist/<%= pkg.name %>.css': '<%= pkg.name %>.less'
                }
            },
            minify: {
                options: {
                    cleancss: true,
                    banner: '<%= banner %>'
                },
                files: {
                    'dist/<%= pkg.name %>.min.css': 'dist/<%= pkg.name %>.css',
                    'dist/<%= pkg.name %>-rtl.min.css': 'dist/<%= pkg.name %>-rtl.css',
                }
            }


        },
        cssflip: {
            rtl: {
                files: {
                  'dist/<%= pkg.name %>-rtl.css': 'dist/<%= pkg.name %>.css'
                }
              },
        },

        autoprefixer: {
            options: {
            browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
          },
          core: {
            options: {
              map: true
            },
            src: 'dist/<%= pkg.name %>.css'
          },
        },
        csscomb: {
              options: {
                config: 'less/.csscomb.json'
              },
              dist: {
                expand: true,
                cwd: 'dist/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/'
              }

        },

        watch: {
            less: {
                files: ['*.less', 'less/*.less'],
                tasks: ['less']
            }
        }




    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    // CSS distribution task.
     grunt.registerTask('dist-css', ['less:core', 'autoprefixer',  'csscomb', 'cssflip', 'less:minify']);

    // Full distribution task.
    grunt.registerTask('dist', ['dist-css']);

    // Default task.
    grunt.registerTask('default', ['dist-css']);

};

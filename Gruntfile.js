module.exports = function(grunt) {
    grunt.initConfig({
        installdir: '../WebClient-Framework/app/scripts/vendor/vmanip-core',
        pkg: grunt.file.readJSON('package.json'),

        qunit: {
            all: ['tests/*.html']
        },

        requirejs: {
            dist: {
                options: {
                    mainConfigFile: 'src/requirejs.config.js',
                    out: 'dist/<%= pkg.name %>.min.js',
                    almond: true,
                    optimize: 'uglify2',
                    baseUrl: './src',
                    useStrict: true,
                    wrap: true,
                    include: ['vmanip'],
                    insertRequire: ['vmanip']
                }
            },
            devel: {
                options: {
                    mainConfigFile: 'src/requirejs.config.js',
                    out: 'dist/<%= pkg.name %>.debug.js',
                    almond: true,
                    optimize: 'none',
                    baseUrl: './src',
                    useStrict: true,
                    wrap: true,
                    include: ['vmanip'],
                    insertRequire: ['vmanip']
                }
            // TODO: add 'amd' config!
            }
        },

        jshint: {
            options: {
                devel: true, // removes warnings to undefined 'console'
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                nomen: true,
                globals: {
                    define: true,
                    jQuery: true
                }
            },
            files: ['src/*.js']
        },

        // Note: 'concat' is currently used only for vmanip-core dependencies:
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                files: {
                    // 'dist/<%= pkg.name %>.debug.js': ['src/viewer.js', 'src/**/*.js'],
                    'dist/<%= pkg.name %>-deps.debug.js': [
                        'vendor/underscore/underscore.js',
                        'vendor/backbone/backbone.js',
                        'vendor/backbone.wreqr/lib/backbone.wreqr.js'
                    ]
                }
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        'dist/<%= pkg.name %>.min.js', 
                        'dist/<%= pkg.name %>-deps.debug.js',
                        'dist/<%= pkg.name %>.debug.js'
                    ],
                    dest: '<%= installdir %>'
                }]
            },
        },

        watch: {
            scripts: {
                files: 'src/**/*.js',
                tasks: ['devel']
            }
        }
    });

    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'requirejs:dist');
    grunt.registerTask('build', 'requirejs:dist');
    grunt.registerTask('devel', ['jshint', 'requirejs:devel', 'concat', 'copy']);
};

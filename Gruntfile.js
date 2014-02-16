module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        appdir: '../vmanip-app/app',
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
                    baseUrl: './',
                    useStrict: true,
                    wrap: true,
                    include: ['src/vmanip'],
                    insertRequire: ['src/vmanip']
                }
            },
            devel: {
                options: {
                    mainConfigFile: 'src/requirejs.config.js',
                    out: 'dist/<%= pkg.name %>.debug.js',
                    almond: true,
                    optimize: 'none',
                    baseUrl: './',
                    useStrict: true,
                    wrap: true,
                    include: ['src/vmanip'],
                    insertRequire: ['src/vmanip']
                }
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

        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/<%= pkg.name %>.min.js', 'dist/<%= pkg.name %>.debug.js'],
                    dest: '<%= appdir %>/scripts/vendor/'
                }]
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', 'requirejs:dist');
    grunt.registerTask('build', 'requirejs:dist');
    grunt.registerTask('devel', ['jshint', 'requirejs:devel', 'copy']);
};
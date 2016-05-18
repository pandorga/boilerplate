module.exports = function(grunt) {
    var config = require('./config.json');
    var path = config.directory;
    var cssFileName;

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            config: {
                files: ['gruntfile.js', 'package.json'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: [path.sass + '*.scss', path.sass + '**/*.scss'],
                tasks: ['sass:dev'],
                options: {
                    spawn: true,
                    livereload: true
                },
            }
        },
        sass: {
            dev: {
                options: {
                    noCache: true,
                    lineNumbers: true,
                    update: true,
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [path.css + cssFileName]
            },
            prod: {
                options: {
                    noCache: true,
                    lineNumbers: false,
                    update: false,
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: path.sass,
                    src: ['*.scss'],
                    dest: path.css,
                    ext: '.css'
                }]
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target, outro) {
        cssFileName = filepath + '.tscss';
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass:prod']);

};
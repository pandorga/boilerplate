module.exports = function(grunt) {
    var folder = {
            sass: "public/styles/sass/",
            css: "public/styles/css/"
        }
        // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: [folder.sass + '*.scss', folder.sass + '**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: true,
                    livereload: true
                },
            }
        },
        sass: {
            dist: {
                options: {
                    noCache: true,
                    lineNumbers: true,
                    update: true,
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: folder.sass,
                    src: ['*.scss'],
                    dest: folder.css,
                    ext: '.css'
                }]
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
                    cwd: folder.sass,
                    src: ['*.scss'],
                    dest: folder.css,
                    ext: '.css'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass:prod']);

};
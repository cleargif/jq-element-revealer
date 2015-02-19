'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed http://cleargifltd.mit-license.org/ */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit', 'concat', 'uglify']
      },
      demo: {
        files: ['src/demo/**/*.html', 'src/demo/**/*.css', 'test/**/*.html'],
        tasks: ['bake:build', 'jshint:test', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    bake: {
      build: {
        files: {
          'dist/demo/index.html': 'src/demo/index.html',
          'dist/demo/api-settings.html': 'src/demo/api-settings.html',
          'dist/demo/publishers.html': 'src/demo/publishers.html',
          'dist/demo/subscribers.html': 'src/demo/subscribers.html',
          'dist/demo/buttons.html': 'src/demo/buttons.html',
          'dist/demo/radios.html': 'src/demo/radios.html',
          'dist/demo/links.html': 'src/demo/links.html'
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: ['demo/css/*', 'demo/fonts/*', 'demo/js/*'],
            cwd: 'src',
            dest: 'dist/',
            filter: 'isFile'
          }
        ],
      },
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9000,
          open: 'http://localhost:9000/dist/demo/'
        }
      },
      build: {
        options: {
          hostname: '*',
          port: 9000
        }
      }
    },
    version: {
      project: {
        src: ['package.json', 'bower.json', 'jq-element-revealer.jquery.json']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'connect:server', /*'qunit',*/ 'clean', 'concat', 'uglify', 'copy:main', 'bake:build', 'watch']);

  grunt.registerTask('build', ['jshint', 'connect:build', 'clean', 'concat', 'uglify', 'copy:main', 'bake:build']);

  grunt.registerTask('serve', ['default']);

  grunt.registerTask('test', ['jshint', 'connect:build', 'qunit']);
};

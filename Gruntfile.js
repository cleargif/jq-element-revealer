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
      dist1: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      },
      dist2: {
        src: ['src/<%= pkg.name %>-umd.js'],
        dest: 'dist/jquery.<%= pkg.name %>-umd.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist1: {
        src: '<%= concat.dist1.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      },
      dist2: {
        src: '<%= concat.dist2.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>-umd.min.js'
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
        files: ['src/demo/**/*.html', 'test/**/*.html'],
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
          'dist/demo/buttons.html': 'src/demo/buttons.html',
          'dist/demo/radios.html': 'src/demo/radios.html'
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
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'connect:server', 'qunit', 'clean', 'concat', 'uglify', 'copy:main', 'bake:build', 'watch']);

  grunt.registerTask('build', ['jshint', 'connect:build', 'qunit', 'clean', 'concat', 'uglify', 'copy:main', 'bake:build']);

  grunt.registerTask('serve', ['default']);

  grunt.registerTask('test', ['jshint', 'connect:build', 'qunit']);
};

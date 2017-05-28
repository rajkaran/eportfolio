'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically 
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    concat: 'web/bundles/rajkaranportfolio/concat',
    dist: 'web/bundles/rajkaranportfolio/dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
        js: {
            files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
            tasks: ['concat:customJS']
        },
        styles: {
            files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
            tasks: ['concat:customCSS', 'postcss']
        },
        gruntfile: {
            files: ['Gruntfile.js'],
            tasks: ['concat', 'postcss', 'copy:fonts', 'copy:images', 'copy:executables']
        },
        fonts: {
            files: ['<%= yeoman.app %>/fonts/{,*/}*.{eot,svg,ttf,woff,otf,woff2}'],
            tasks: ['copy:fonts']
        },
        images: {
            files: ['<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}'],
            tasks: ['copy:images']
        },
        executables: {
            files: ['<%= yeoman.app %>/executables/{,*/}*.*'],
            tasks: ['copy:executables']
        }
    },

    concat:{
		options:{
			separator:'\n'
		},
		customCSS:{
			src:['<%= yeoman.app %>/styles/*.css'],
			dest:'<%= yeoman.concat %>/css/custom.css'
		},
		vendorCSS:{
			src:['bower_components/bootstrap/dist/css/bootstrap.min.css',
                 'bower_components/owl.carousel/dist/assets/owl.carousel.min.css'],
			dest:'<%= yeoman.concat %>/css/vendor.css'
		},
		customJS:{
			src:['<%= yeoman.app %>/scripts/app.js',
				 '<%= yeoman.app %>/scripts/services/ServiceModule.js',
				 '<%= yeoman.app %>/scripts/controllers/*.js',
				 '<%= yeoman.app %>/scripts/services/*.js',
                 '<%= yeoman.app %>/scripts/directives/*.js',
				],
			dest:'<%= yeoman.concat %>/js/custom.js'
		},
		vendorJS:{
			src:['bower_components/jquery/dist/jquery.min.js',
                 'bower_components/svg.js/dist/svg.min.js',
                 'bower_components/svg.draggable.js/dist/svg.draggable.min.js',
				 'bower_components/angular/angular.min.js',
				 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                 'bower_components/owl.carousel/dist/owl.carousel.min.js',
				 '<%= yeoman.app %>/scripts/thirdParty/router.js',
				 '<%= yeoman.app %>/scripts/thirdParty/fos_js_routes.js',
				],
			dest:'<%= yeoman.concat %>/js/vendor.js'
		}
	},

    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({browsers: ['last 2 version']}),
                //require('cssnano')() // minify the result
            ]
        },
        dist: {
            src: '<%= yeoman.concat %>/css/custom.css',
            dest:'<%= yeoman.concat %>/css/custom.css'
        }
    },

    cssnano: {
        options: {
            sourcemap: true
        },
        dist: {
            files: {
                '<%= yeoman.dist %>/css/custom.css': '<%= yeoman.concat %>/css/custom.css'
            }
        }
    },

	uglify: {
		dist: {
			files: {
				'<%= yeoman.dist %>/js/custom.js':'<%= yeoman.concat %>/js/custom.js'
			}
		}
	},

    //Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.concat %>/js/custom.js'
        ]
      }
    },

    //Empties folders to start fresh
    clean: {
        dist: {
            files: [{
                dot: true,
                src: [
                    '<%= yeoman.dist %>/{,*/}*',
                    '!<%= yeoman.dist %>/.git*'
                ]
            }]
        }
    },


    //Renames files for browser caching purposes
    filerev: {
        dist: {
            src: [
                '<%= yeoman.dist %>/js/{,*/}*.js',
                '<%= yeoman.dist %>/css/{,*/}*.css',
                '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
                '<%= yeoman.dist %>/fonts/*'
            ]
        }
    },


    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngAnnotate: {
        options: {
            add : true,
            singleQuotes : true
        },
        dist: {
            files: {
                '<%= yeoman.concat %>/js/custom.js' : '<%= yeoman.concat %>/js/custom.js'
            }
        }
    },


    // Copies remaining files to places other tasks can use
    copy: {
        dist:{
            fonts: {
                expand: true,
                cwd: '<%= yeoman.concat %>/fonts',
                src: '{,*/}*.*',
                dest: '<%= yeoman.dist %>/fonts'
            },
            executables: {
                expand: true,
                cwd: '<%= yeoman.concat %>/executables',
                src: '{,*/}*.*',
                dest: '<%= yeoman.dist %>/executables'
            }
        },
        fonts: {
            expand: true,
            flatten: true,
            src: ['bower_components/bootstrap/dist/fonts/*.*',
            '<%= yeoman.app %>/fonts/{,*/}*.{eot,svg,ttf,woff,otf,woff2}'],
            dest: '<%= yeoman.concat %>/fonts',
            filter: 'isFile'
        },
        images: {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
            dest: '<%= yeoman.concat %>/images'
        },
        executables: {
            expand: true,
            cwd: '<%= yeoman.app %>/executables',
            src: '{,*/}*.*',
            dest: '<%= yeoman.concat %>/executables'
        }
    }


  });


  grunt.registerTask('build', [
    'clean:dist',
    'cssnano',
    'jshint',
    'ngAnnotate',
    'copy:dist',
    'uglify',
    'filerev',
  ]);


};

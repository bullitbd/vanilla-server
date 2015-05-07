'use strict';

module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig( {
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'server.js', 'test/**/*.js']
      },

      options: {
        node: true,
        globals: {
          describe: true,
          it: true,
          before: true,
          after: true,
          beforeEach: true,
          afterEach: true
        }
      }
    },

    simplemocha: {
      options: {
        globals: {
          timeout: 3000,

        }
      },

        dev: {
          src: ['Gruntfile.js', 'server.js', 'test/**/*.js']
        }
      }
    

  });

  grunt.registerTask('test', ['jshint:dev', 'simplemocha:dev']);
  grunt.registerTask('default', ['test']);


};
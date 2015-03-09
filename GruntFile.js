module.exports = function(grunt) {

	grunt.initConfig({
		jsdoc : {
			test : {
				options: {
					destination: 'doc'
				},

				src: ['scripts/*.js'],
			},
		},

		watch: {
			scripts: {
				options: {
					spawn: false,
				},

				files: [ 'scripts/**/*.js', ],
				tasks: [ 'jsdoc', ],
			},
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [ 'jsdoc', 'watch', ]);

};
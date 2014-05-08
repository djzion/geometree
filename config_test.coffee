# Manages the build for the signup page.                                                                                                              
exports.config =
    # See docs at http://brunch.readthedocs.org/en/latest/config.html.                                                                                
    paths:
        public: '/path/to/deployment/signup'

    files:
        javascripts:
            joinTo:
                'index.js': /^app(/|\)assets(/|\)signup/

	  stylesheets:
        joinTo: 'index.css': /^app(/|\)assets(/|\)signup/

    conventions:
	      ignored: -> false
	      assets: -> false
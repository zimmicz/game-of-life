build:
	node_modules/browserify/bin/cmd.js main.js -o dist/bundle.js

dev-build:
	node_modules/browserify/bin/cmd.js main.js --debug -o dist/bundle.js

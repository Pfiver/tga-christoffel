SHELL:=/bin/bash
all:
	npm install
	rm -rf target
	ruby tools/process_headers.rb
	ruby tools/render_templates.rb
	node -r ./node_modules/babel-register ./node_modules/webpack/bin/webpack

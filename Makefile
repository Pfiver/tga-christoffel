SHELL:=/bin/bash
all:
	npm install
	rm -rf target
	ruby tools/process_headers.rb
	ruby tools/render_templates.rb
	node ./node_modules/webpack/bin/webpack

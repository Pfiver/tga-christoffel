all:
	rm -rf target \
	    && ruby tools/process_headers.rb \
	    && ruby tools/render_templates.rb \
	    && node ./node_modules/webpack/bin/webpack \
	    && bash -c 'ln -s ../{fonts,node_modules,calendar-data.xml} target'

all:
	rm -rf target \
	    && ruby tools/render_templates.rb \
	    && node ./node_modules/webpack/bin/webpack \
	    && bash -c 'ln -s ../{photos,fonts,node_modules,calendar-data.xml} target'

all:
	rm -rf target && ruby tools/render_templates.rb && webpack && ln -s ../{photos,fonts,node_modules,calendar-data.xml} target
obsolete:
	rm -rf target && jekyll b && webpack && ln -s ../{photos,fonts,node_modules,calendar-data.xml} target

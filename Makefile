SHELL:=/bin/bash

all:
	npm install
	rm -rf target
	ruby tools/render_templates.rb
	ruby tools/process_headers.rb > target/headers.css
	node -r ./node_modules/babel-register ./node_modules/webpack/bin/webpack

# transfering fotos: $ rsync -av --delete photos/wetransfer-5f74c7 photos/headers $nexus:var/www/www.tga-christoffel.ch/iterativ/photos
# selecting headers: $ cd photos/headers; i=1; for f in ../2014-12-2*; do let i++ n=1+$i/3 m=1+$i%3; ln "$f" header-$n-$m.jpg; done

SHELL:=/bin/bash

all:
	npm install
	rm -rf target
	ruby tools/render_templates.rb
	ruby tools/process_headers.rb > target/headers.css
	node -r ./node_modules/babel-register ./node_modules/webpack/bin/webpack

# transfering fotos: $ rsync -av --delete photos/headers photos/haus-gallery $nexus:var/www/www.tga-christoffel.ch/iterativ/photos
#
# haus_gallery hardlinks: +/. $ (cd ../wetransfer-13270b; ls [0-9]*) | sort -n | while read f; do n=$(echo $f | iconv -f utf-8 -t ascii//IGNORE | sed 's/^\([0-9][ \.]\)/0\1/; s/ /_/g;'); ln -v "../wetransfer-13270b/$f" "$n"; done
# headers hardlinks: +/. $ (cd ../wetransfer-13270b; ls Header*) | while read f; do n=$(echo $f | sed 's/^H/h/; s/ /-/;'); ln -v "../wetransfer-13270b/$f" "$n"; done
#
# random headers hardlinks: $ cd photos/headers; i=1; for f in ../2014-12-2*; do let i++ n=1+$i/3 m=1+$i%3; ln "$f" header-$n-$m.jpg; done

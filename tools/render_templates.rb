#!/usr/bin/env ruby

require_relative 'images_tag'

input = File.read "index.html"
template = Liquid::Template.parse input
File.write "target/index.html", template.render!

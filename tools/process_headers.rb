#!/usr/bin/env ruby

require 'pathname'
require 'fileutils'

require 'rmagick'

path = "photos/headers/header-1-1.jpg"

img = Magick::Image::read(path).first
ext = File.extname(path)
output_path = File.expand_path(path, "target")
output_dir = File.dirname(output_path)
unless File.file? output_path
  unless Dir.exist?(output_dir)
    STDERR.puts "Creating output directory #{output_dir}"
    FileUtils.mkdir_p(output_dir)
  end
  STDERR.puts "Generating #{output_path}"
  img.change_geometry("940x300^") do |cols, rows, i|
    STDERR.puts " (scaling to #{cols}x#{rows}, then cropping to 940x300)"
    i.scale(cols, rows).crop(Magick::CenterGravity, 940, 300).write(output_path) { self.interlace = Magick::PlaneInterlace }
  end
end

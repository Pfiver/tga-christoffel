#!/usr/bin/env ruby

require 'fileutils'

require 'rmagick'

w = 940; h = 300
input_dir = "photos/headers"
output_dir = File.join("target/site", input_dir)

unless Dir.exist? output_dir
  STDERR.puts "Creating output directory #{output_dir}"
  FileUtils.mkdir_p output_dir
end

Dir.glob(File.join(input_dir, "**/*")).select { |path| File.file? path }.each do |path|

  img = Magick::Image::read(path).first

  output_path = File.join("target/site", path)

  img.change_geometry("#{w}x#{h}^") do |cols, rows, i|

    unless File.file? output_path

      STDERR.puts "Generating #{output_path}: first scaling to #{cols}x#{rows}, then cropping to #{w}x#{h}"

      i.scale(cols, rows).crop(Magick::CenterGravity, 940, 300)
          .write(output_path) { self.interlace = Magick::PlaneInterlace }
    end

    classname = File.basename(path, File.extname(path))
    puts ".#{classname} { background-image: url(\"../#{path}\"); }"
  end

  img.destroy!
end

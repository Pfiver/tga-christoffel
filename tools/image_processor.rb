require 'pathname'
require 'fileutils'

require 'rmagick'
require 'unicode_utils'

module ImageProcessor
  def process(path, config)
    raise SyntaxError.new("Invalid image path specified: #{path}") unless File.file?(path)
    STDERR.puts "Processing #{path}"
    img = Magick::Image::read(path).first
    ascii_path = UnicodeUtils.nfkd(path).gsub(/(\p{Letter})\p{Mark}+/,'\\1')
    ext = File.extname(ascii_path)
    out = { basename: File.basename(ascii_path, ext),
            original: { path: ascii_path, width: img.columns, height: img.rows }, resized: {} }
    output_path = File.expand_path(ascii_path, "target")
    output_dir = File.dirname(output_path)
    unless File.file? output_path
      unless Dir.exist?(output_dir)
        STDERR.puts "Creating output directory #{output_dir}"
        FileUtils.mkdir_p(output_dir)
      end
      STDERR.puts "Generating #{output_path}"
      img.write (output_path) { self.interlace = Magick::PlaneInterlace }
    end
    config[:geometries].each do |geometry|
      img.change_geometry(geometry) {|cols, rows, i|
        rendition_path = Pathname.new(config[:output_path_format] % {
             filepath: ascii_path[0..-ext.length-1], width: cols, height: rows, ext: ext[1..-1]})
        out[:resized][geometry] = { path: rendition_path, width: cols, height: rows }
        output_path = File.expand_path(rendition_path, "target")
        unless File.file? output_path
          STDERR.puts "Generating #{output_path}"
          i.resize(cols, rows).write(output_path) { self.interlace = Magick::PlaneInterlace }
        end
      }
    end
    img.destroy!
    out
  end
end

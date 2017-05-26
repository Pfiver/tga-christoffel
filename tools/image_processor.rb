require 'logger'
require 'pathname'
require 'fileutils'

require 'rmagick'

module ImageProcessor
  def process(path, config)
    raise SyntaxError.new("Invalid image path specified: #{path}") unless File.file?(path)
    STDERR.puts "Processing #{path}"
    img = Magick::Image::read(path).first
    ext = File.extname(path)
    out = { basename: File.basename(path, ext),
            original: { path: path, width: img.columns, height: img.rows }, resized: {} }
    config[:geometries].each do |geometry|
      img.change_geometry!(geometry) {|cols, rows, i|
        output_path = Pathname.new(config[:output_path_format] % {
            filepath: path[0..-ext.length-1], width: cols, height: rows, ext: ext[1..-1]}).to_s
        out[:resized][geometry] = {
           path: output_path,
           width: cols,
           height: rows
        }
        output_path = File.expand_path(output_path.to_s, "target")
        unless File.file? output_path
          output_dir = File.dirname(output_path)
          unless Dir.exist?(output_dir)
            STDERR.puts "Creating output directory #{output_dir}"
            FileUtils.mkdir_p(output_dir)
          end
          STDERR.puts "Generating #{output_path}"
          i.resize(cols, rows).write(output_path)
        end
      }
    end
    img.destroy!
    out
  end
end

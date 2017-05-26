require 'rmagick'

module JekyllImagesTag
  module ImageProcessor
    def process(path, config)
      ext = File.extname(path)
      input_path = File.expand_path(path.to_s, config[:site].source)
      raise SyntaxError.new("Invalid image path specified: #{path}") unless File.file?(input_path)
      Jekyll.logger.info "Processing #{input_path}"
      img = Magick::Image::read(input_path).first
      original = {
          path: path,
          width: img.columns,
          height: img.rows,
      }
      resized = []
      config[:geometries].each do |geometry|
        img.change_geometry!(geometry) {|cols, rows, i|
          output_path = Pathname.new(config[:output_path_format] % {
              filepath: path[0..-ext.length], width: cols, height: rows, ext: ext[1..-1]}).to_s
          resized.push({
             path: output_path,
             width: cols,
             height: rows
          })
          output_path = File.expand_path(output_path.to_s, config[:site].dest)
          Jekyll.logger.info "Generating #{output_path}"
          output_dir = File.dirname(output_path)
          unless Dir.exist?(output_dir)
            Jekyll.logger.info "Creating output directory #{output_dir}"
            FileUtils.mkdir_p(output_dir)
          end
          i.resize(cols, rows).write(output_path)
        }
      end
      img.destroy!
      { basename: File.basename(path, ext),
        original: original, resized: resized }
    end
  end
end

require_relative 'images_tag/image_processor'

module JekyllImagesTag
  class ImagesTag < Liquid::Block

    def initialize(tag_name, markup, tokens)
      @attributes = {}
      markup.scan(Liquid::TagAttributes) { |key, value|
        @attributes[key.to_sym] = value
      }
      super
    end

    def render(context)
      config = Config.new(context.registers[:site]).to_h
      result = []
      context.stack do
        files.each do |path|
          Jekyll.logger.info "Processing #{path}"
          ImageProcessor.process(path, config)
          context['image'] = {
              'path' => path,
          }
          result.push render_all(@nodelist, context)
        end
      end
      result
    end

    def files
      Dir.glob(File.join(@attributes[:path], "**/*")).select { |path| File.file?(path) }
    end
  end
end

Liquid::Template.register_tag('images', JekyllImagesTag::ImagesTag)

require_relative 'images_tag/image_processor'

module JekyllImagesTag
  class ImagesTag < Liquid::Block
    include ImageProcessor
    def initialize(tag_name, markup, tokens)
      @attributes = {}
      markup.scan(Liquid::TagAttributes) { |key, value|
        @attributes[key.to_sym] = value
      }
      super
    end
    def render(context)
      config = {
          site: context.registers[:site],
          path: "images",
          geometries: [],
          output_path_format: "images/%{filename}-%{width}x%{height}.%{extension}"
      }.merge(symbolize_keys(context.registers[:site].config['image_tag'][@attributes[:config]]))
      files = Dir.glob(File.join(config[:path], "**/*")).select { |path| File.file?(path) }
      result = []
      context.stack do
        files.each do |path|
          img = process(path, config)
          context['image'] = stringify_keys({
              basename: img[:basename],
              original: stringify_keys(img[:original]),
              resized: img[:resized].map {|hash| stringify_keys(hash)},
          })
          result.push render_all(@nodelist, context)
        end
      end
      result
    end
    def symbolize_keys(hash)
      result = {}
      hash.each_key do |key|
        result[key.to_sym] = hash[key]
      end
      result
    end
    def stringify_keys(hash)
      result = {}
      hash.each_key do |key|
        result[key.to_s] = hash[key]
      end
      result
    end
  end
end
Liquid::Template.register_tag('images', JekyllImagesTag::ImagesTag)

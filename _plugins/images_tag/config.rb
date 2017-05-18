module JekyllImagesTag
  class Config
    DEFAULTS = {
      'default_quality'    => 90,
      'base_path'          => 'assets',
      'output_path_format' => 'assets/resized/%{filename}-%{width}x%{height}.%{extension}',
      'sizes'              => [],
      'extra_images'       => [],
      'auto_rotate'        => false
    }

    def initialize(site)
      @site = site
    end

    def to_h
      DEFAULTS.merge(@site.config['responsive_image'])
              .merge(site_source: @site.source, site_dest: @site.dest)
    end
  end
end

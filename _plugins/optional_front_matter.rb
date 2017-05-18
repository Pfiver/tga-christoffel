module JekyllOptionalFrontMatter
  class Generator < Jekyll::Generator
    def generate(site)
      site.static_files.delete_if do |static_file|
        site.pages.push Jekyll::Page.new(
            site, (static_file.instance_variable_get :@base),
            (static_file.instance_variable_get :@dir), (static_file.instance_variable_get :@name))
        true
      end
    end
  end
end

# app/helpers/application_helper.rb
def vite_asset_path(filename)
    manifest_path = Rails.root.join('public', 'vite', 'manifest.json')
    if File.exist?(manifest_path)
      manifest = JSON.parse(File.read(manifest_path))
      manifest[filename]["file"] if manifest[filename]
    end
  end
  
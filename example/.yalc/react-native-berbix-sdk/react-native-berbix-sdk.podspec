require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-berbix-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://bitbucket.org/mihaichifor/react-native-berbix-sdk.git", :tag => "#{s.version}" }
  s.source       = { :git => 'https://github.com/berbix/berbix-ios-spec.git', :tag => s.version.to_s }


  s.source_files = "ios/**/*.{h,m,mm,swift}"


  s.dependency "React"
  s.dependency "Berbix", "1.0.7"
end

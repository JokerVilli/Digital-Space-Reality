var info = chrome.runtime.getManifest();

var meta_install = document.createElement('meta');
    meta_install.name = "browser-extension";
    meta_install.content = "chrome";
    document.getElementsByTagName('head')[0].appendChild(meta_install);

var meta_version = document.createElement('meta');
    meta_version.name = "browser-extension-version";
    meta_version.content = info.version;
    document.getElementsByTagName('head')[0].appendChild(meta_version);



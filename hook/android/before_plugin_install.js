#!/usr/bin/env node

module.exports = function (context) {
    var fs = require('fs');
    var path = require('path');

    var manifestPath = path.join(context.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    var manifestContent = fs.readFileSync(manifestPath, 'utf8');

    var permissionW = 'android.permission.WRITE_EXTERNAL_STORAGE';
    var permissionWTag = '<uses-permission android:name="' + permissionW + '" />';

    if (!manifestContent.includes(permissionWTag)) {
        var insertPosition = manifestContent.indexOf('<application');
        manifestContent = manifestContent.slice(0, insertPosition) + permissionWTag + '\n' + manifestContent.slice(insertPosition);
        fs.writeFileSync(manifestPath, manifestContent, 'utf8');
    }
  
    var permissionR = 'android.permission.READ_EXTERNAL_STORAGE';
    var permissionRTag = '<uses-permission android:name="' + permissionR + '" />';

    if (!manifestContent.includes(permissionRTag)) {
        var insertPosition = manifestContent.indexOf('<application');
        manifestContent = manifestContent.slice(0, insertPosition) + permissionRTag + '\n' + manifestContent.slice(insertPosition);
        fs.writeFileSync(manifestPath, manifestContent, 'utf8');
    }
};

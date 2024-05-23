#!/usr/bin/env node

module.exports = function (context) {
    var fs = require('fs');
    var path = require('path');

    var manifestPath = path.join(context.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    var manifestContent = fs.readFileSync(manifestPath, 'utf8');

    function addPermission(permission) {
        var permissionTag = '<uses-permission android:name="' + permission + '" />';
        if (!manifestContent.includes(permissionTag)) {
            var insertPosition = manifestContent.indexOf('<application');
            manifestContent = manifestContent.slice(0, insertPosition) + permissionTag + '\n' + manifestContent.slice(insertPosition);
        }
    }

    addPermission('android.permission.WRITE_EXTERNAL_STORAGE');
    addPermission('android.permission.READ_EXTERNAL_STORAGE');

    // Write the updated manifest content back to the file
    fs.writeFileSync(manifestPath, manifestContent, 'utf8');
};

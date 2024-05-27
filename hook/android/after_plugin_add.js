const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// AndroidManifest.xml 文件的路径
const manifestPath = path.join('..', 'source', 'platforms', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');

// 读取AndroidManifest.xml文件
fs.readFile(manifestPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading AndroidManifest.xml:', err);
        return;
    }

    // 解析XML
    xml2js.parseString(data, (err, result) => {
        if (err) {
            console.error('Error parsing AndroidManifest.xml:', err);
            return;
        }

        // 提取和去重uses-permission元素
        const permissions = new Set();
        if (result.manifest['uses-permission']) {
            result.manifest['uses-permission'].forEach((permission) => {
                permissions.add(permission['$']['android:name']);
            });
        }

        console.log(Array.from(permissions).join(' '));

        // 重新构建去重后的uses-permission元素
        result.manifest['uses-permission'] = Array.from(permissions).map((name) => ({
            '$': { 'android:name': name }
        }));

        console.log(result);

        // 将修改后的XML转换回字符串
        const builder = new xml2js.Builder();
        const updatedXml = builder.buildObject(result);

        // 将更新后的XML写回AndroidManifest.xml文件
        fs.writeFile(manifestPath, updatedXml, 'utf8', (err) => {
            if (err) {
                console.error('Error writing AndroidManifest.xml:', err);
            } else {
                console.log('Successfully updated AndroidManifest.xml');
            }
        });
    });
});

var http = require('http');

module.exports = {
    sendPost: function (path, data, calbackOnData) {
        var options = {
            host: "localhost",
            port: 3000,
            path: path,
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data)
            }
        };
        var externalRequest = http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');

            res.on('data', calbackOnData);

        });

        externalRequest.on('error', function (e) {
            console.log('ERROR: ' + e.message);
        });

        externalRequest.write(data);
        externalRequest.end();
    }
}
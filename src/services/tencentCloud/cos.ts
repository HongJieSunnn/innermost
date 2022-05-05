import COS from "cos-js-sdk-v5";

export const Bucket = 'innermost-user-img-1300228246';
export const Region = 'ap-nanjing';

export var cos = new COS({
    getAuthorization: function (options, callback) {

        var url = 'https://localhost:7009/api/TencentCloudCos/temp-credencial';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e:any) {
            try {
                var data = JSON.parse(e.target.responseText);
                var credentials = data.Credentials;
            } catch (e) {
            }
            if (!data || !credentials) {
              return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
            };
            callback({
              TmpSecretId: credentials.TmpSecretId,
              TmpSecretKey: credentials.TmpSecretKey,
              SecurityToken: credentials.Token,
              StartTime: data.StartTime, 
              ExpiredTime: data.ExpiredTime,
          });
        };
        xhr.send();
    }
});
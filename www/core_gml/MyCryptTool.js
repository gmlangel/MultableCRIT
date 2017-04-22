/**
 * 加解密工具
 * Created by guominglong on 2017/4/22.
 在看web api时发现浏览器竟然提供了原生的RSA和AES的加密解密方法。然后就试了一下，
 速度还是很快的。相关内容https://developer.mozilla.org/en-US/docs/Web/API/Crypto, google的
 例子 https://chromium.googlesource.com/chromium/blink/+/72fef91ac1ef679207f51def8133b336a6f6588f/LayoutTests/crypto
 (这个是chromium的测试代码，里面包含了使用的方法)
 */

class MyCryptTool{
    constructor(){

    }

    encryptUTF8(){

    }

    decryptUTF8(){

    }

    createNewUserKey(){
        var algorithmKeyGen = {
            name: "RSA-OAEP",
            hash: {name: "sha-256"},
            // RsaKeyGenParams
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),  // Equivalent to 65537
        };
        var nonExtractable = false;

        var publicKey = "";
        var privateKey = "";
        var keyPairs = "";
        return crypto.subtle.generateKey(algorithmKeyGen, true, ['encrypt', 'decrypt']).then(function(result) {
            // gene key pair
            keyPairs = result;
            return Promise.all([crypto.subtle.exportKey("jwk", keyPairs.publicKey),
                crypto.subtle.exportKey("jwk", keyPairs.privateKey)]);
        })

    }

    _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    geneRandomHexStr(length){
        var text = "";
        var possible = "0123456789abcdef";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    hexStringToUint8Array(hexString) {
        if (hexString.length % 2 != 0)
            throw "Invalid hexString";
        var arrayBuffer = new Uint8Array(hexString.length / 2);
        for (var i = 0; i < hexString.length; i += 2) {
            var byteValue = parseInt(hexString.substr(i, 2), 16);
            if (byteValue == NaN)
                throw "Invalid hexString";
            arrayBuffer[i/2] = byteValue;
        }
        return arrayBuffer;
    }

    bytesToHexString(bytes) {
        if (!bytes)
            return null;
        bytes = new Uint8Array(bytes);
        var hexBytes = [];
        for (var i = 0; i < bytes.length; ++i) {
            var byteString = bytes[i].toString(16);
            if (byteString.length < 2)
                byteString = "0" + byteString;
            hexBytes.push(byteString);
        }
        return hexBytes.join("");
    }

    /**
     * 对Uint8Array加密
     * */
    encryptBuffer(buf,keyJSON){
        var data = buf;
        var randomsKeys = geneRandomHexStr(64); // 128 bit keys
        var encryptedKey = hexStringToUint8Array(randomsKeys);
        var aesAlgo = {name: 'aes-cbc', iv: hexStringToUint8Array("000102030405060708090a0b0c0d0e0f")};
        return crypto.subtle.importKey("jwk", keyJSON, {name: "rsa-oaep", hash: {name: "sha-256"}},true, ['encrypt'],function(publicKey){
            console.log(1)
            return crypto.subtle.encrypt({name: "rsa-oaep"}, publicKey, encryptedKey);
        },function(res){
            console.log(2)
            encryptedKey = bytesToHexString(res)
            // use aes to encrypt data
            // import aes key
            return crypto.subtle.importKey('raw',
                hexStringToUint8Array(randomsKeys) , aesAlgo, false, ['encrypt', 'decrypt']);

        },function(result){
            console.log(3)
            // use aes to encode
            return crypto.subtle.encrypt(aesAlgo,
                result, data);
        },function(encryptedData){
            console.log(4)
            return Promise.resolve({
                'encrypted': bytesToHexString(encryptedData),
                'encryptedKey': encryptedKey,
            });
        })
        //return crypto.subtle.importKey("jwk", keyJSON, {name: "rsa-oaep", hash: {name: "sha-256"}},true, ['encrypt'])
        //    .then(function(publicKey){
        //        console.log(1)
        //        return crypto.subtle.encrypt({name: "rsa-oaep"}, publicKey, encryptedKey);
        //    }).then(function(res){
        //        console.log(2)
        //        encryptedKey = bytesToHexString(res)
        //        // use aes to encrypt data
        //        // import aes key
        //        return crypto.subtle.importKey('raw',
        //            hexStringToUint8Array(randomsKeys) , aesAlgo, false, ['encrypt', 'decrypt']);
        //
        //    }).then(function(result){
        //        console.log(3)
        //        // use aes to encode
        //        return crypto.subtle.encrypt(aesAlgo,
        //            result, data);
        //    }).then(function(encryptedData){
        //        console.log(4)
        //        return Promise.resolve({
        //            'encrypted': bytesToHexString(encryptedData),
        //            'encryptedKey': encryptedKey,
        //        });
        //    });
    }

    /**
     * 对Uint8Array解密
     * */
    decryptBuffer(encryptedBuffer,keyJSON){
        let data = encryptedBuffer;
        // use local private key to decrypt
        var encryptedKey = new hexStringToUint8Array(data.encryptedKey);
        var encryptedData = new hexStringToUint8Array(data.encrypted);
        var aesAlgo = {name: 'aes-cbc', iv: hexStringToUint8Array("000102030405060708090a0b0c0d0e0f")};
        // decrypt key
        return crypto.subtle.importKey('jwk', keyJSON, {name: "rsa-oaep", hash: {name: "sha-256"}}, true,
            ['decrypt']).then(function(privateKey){
            return crypto.subtle.decrypt({name: 'rsa-oaep'}, privateKey, encryptedKey);
        }).then(function(decryptedKey){
            // import aes key
            return crypto.subtle.importKey('raw',
                decryptedKey, aesAlgo, false, ['encrypt', 'decrypt']);
        }).catch(function(){
            console.error("decrypt error");
        }).then(function(result){
            // decode encrypted data
            return crypto.subtle.decrypt(aesAlgo, result, encryptedData);
        }).then(function(data){
            console.log("解密成功")
            new Uint8Array(data).forEach(d => console.log(d));
            return Promise.resolve(new TextDecoder("UTF-8").decode(new Uint8Array(data)));
        })
    }
}

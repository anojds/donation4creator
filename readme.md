# 오류 해결 기록

## nodemailer 메일서버 ssl 연결 오류
---

`오류 내용 : 
(node:18952) UnhandledPromiseRejectionWarning: Error: 11104:error:1408F10B:SSL routines:ssl3_get_record:wrong version number:c:\ws\deps\openssl\openssl\ssl\record\ssl3_record.c:332: `

<br>

### 해결법: 

nodemailer.createTransport 속성에 tls ciphers 속성을 SSLv3으로 변경후
secureConnection 값을 false로 한다
``` js
tls: {
    ciphers:'SSLv3'
},

secureConnection: false
```

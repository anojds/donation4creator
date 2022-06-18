# donate4creator
카카오페이, 토스 아이디를 이용하여 무료 송금 서비스입니다.

## 스크린샷
![1](https://user-images.githubusercontent.com/72495729/174440208-cbfda54c-b38a-4691-a6ba-1dac13ef0a28.png)

![2](https://user-images.githubusercontent.com/72495729/174440233-99ad1967-ede0-4777-84de-85e31e472f52.png)

![3](https://user-images.githubusercontent.com/72495729/174440237-3fb3165a-8ed1-41e0-8537-996a61bd268f.png)


# 오류 해결 기록

## nodemailer 메일서버 ssl 연결 오류
---

`오류 내용 : 
(node:18952) UnhandledPromiseRejectionWarning: Error: 11104:error:1408F10B:SSL routines:ssl3_get_record:wrong version number:c:\ws\deps\openssl\openssl\ssl\record\ssl3_record.c:332: `

<br>

### 해결법: 

nodemailer.createTransport 속성에 tls > ciphers 속성을 SSLv3으로 변경후
secureConnection 값을 false로 한다
``` js
tls: {
    ciphers:'SSLv3'
},

secureConnection: false
```

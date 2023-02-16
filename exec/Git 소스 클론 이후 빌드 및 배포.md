# Git 소스 클론 이후 빌드 및 배포

---
# 버전

- Frontend
    - React (v18.2.0)
    - React-router-dom (v6.7.0)
    - Recoil (v0.7.6)
    - recoil-persist (v4.2.0)
    - styled-components (v5.3.6)
- Backend
    - JVM :  openjdk 11
    - SpringBoot 2.7.8
    - IDE : IntelliJ IDEA 2022.3.1 (Ultimate Edition)
- Database
    - MySQL 8.0.31
---
# **Nginx 설정과 ssl 인증서 발급 및 적용**

### Certbot 설치하기

```bash
sudo apt update
sudo apt upgrade
sudo add-apt-repository ppa:certbot/certbot
sudo apt install python3-certbot-nginx
```

### NGINX 설정하기

```bash
sudo vim /etc/nginx/sites-available/default

# 파일 안에 server_name [도메인]; 적어주기
# 띄워쓰기로 도메인 구분, 세미콜론으로 마침 표시
```

### nginx.conf

```bash
server {

        location /{
                proxy_pass http://localhost:3000;
        }

        location /api/ {
                proxy_pass http://localhost:8080/;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        }
        location /v1/ {
                proxy_pass http://localhost:8999;
        }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/i8b203.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i8b203.p.ssafy.io/privkey.pem; # managed by Certbot
    # include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = i8b203.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        listen 80;
        server_name i8203.p.ssafy.io;

    return 404; # managed by Certbot
}
```

### SSL 인증서 발급 및 적용

```bash
sudo certbot --nginx
```

```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel): # 이메일 입력

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must
agree in order to register with the ACME server at
https://acme-v02.api.letsencrypt.org/directory
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(A)gree/(C)ancel: # a 입력

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: # 이메일 알림 관련 : y or n 입력
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for i8b203.p.ssafy.io
Waiting for verification...
Cleaning up challenges
Deploying Certificate to VirtualHost /etc/nginx/sites-enabled/default

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): # 2 입력시 redirect
Redirecting all traffic on port 80 to ssl in /etc/nginx/sites-enabled/default

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Congratulations! You have successfully enabled https://i8b203.p.ssafy.io

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=https://i8b203.p.ssafy.io
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# 체인
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/i8b203.p.ssafy.io/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/i8b203.p.ssafy.io/privkey.pem
   Your cert will expire on 2023-05-02. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

### 인증서 자동 갱신

```bash
sudo certbot renew --dry-run
```

### 방화벽 HTTPS 적용

```bash
sudo ufw allow 443
```

### NGINX 서버 재시작

```bash
sudo service nginx restart
```
---
# Openvidu

### 오픈비두를 설치할 경로로 이동

```bash
cd /opt
```

### 오픈비두 설치

```bash
curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh> | bash
```

### 설치된 경로로 이동

```bash
$ cd openvidu
```

### 도메인 또는 PUBLIC IP와 오픈비두와 통신을 위한 설정

```bash
$ nano .env

# OpenVidu configuration
# ----------------------
# 도메인 또는 퍼블릭IP 주소
DOMAIN_OR_PUBLIC_IP=i8b203.p.ssafy.io

# 오픈비두 서버와 통신을 위한 시크릿
OPENVIDU_SECRET={secret}

# Certificate type
CERTIFICATE_TYPE=letsencrypt

# 인증서 타입이 letsencrypt일 경우 이메일 설정
LETSENCRYPT_EMAIL={email}

# HTTP port
HTTP_PORT=8442

# HTTPS port(해당 포트를 통해 오픈비두 서버와 연결)
HTTPS_PORT=8443
```

### 설정 후 오픈비두 서버 실행

```bash
$ ./openvidu start

Creating openvidu-docker-compose_coturn_1          ... done
Creating openvidu-docker-compose_app_1             ... done
Creating openvidu-docker-compose_kms_1             ... done
Creating openvidu-docker-compose_nginx_1           ... done
Creating openvidu-docker-compose_redis_1           ... done
Creating openvidu-docker-compose_openvidu-server_1 ... done

----------------------------------------------------

   OpenVidu Platform is ready!
   ---------------------------

   * OpenVidu Server: https://DOMAIN_OR_PUBLIC_IP/

   * OpenVidu Dashboard: https://DOMAIN_OR_PUBLIC_IP/dashboard/

----------------------------------------------------
```
---
# Dockerfile 작성

## FrontEnd

### Dockerfile

```bash
# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# work dir 고정
WORKDIR /app

# work dir 에 build 폴더 생성 /{workdir}/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 3000 포트 오픈
EXPOSE 3000

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```bash
server {
    listen 3000;
    location / {
        root    /app/build;
        index   index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

## BackEnd

### Dockerfile

```docker
FROM openjdk:11-jdk-slim

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
```
---
# 환경변수 설정 및 프로젝트 빌드

## Frontend

<aside>
🔐 **Client .env**

</aside>

```jsx
REACT_APP_SERVER_URL=https://i8b203.p.ssafy.io/api
REACT_APP_KAKAO_ADMIN_KEY=(key)
REACT_APP_KAKAO_MAP_KEY=(key)
REACT_APP_SIGNALING_SERVER_URL=https://i8b203.p.ssafy.io:3001
REACT_APP_OPENVIDU_SERVER_SECRET=(key)
```

### Visual Studio Code**에서 리액트 프로젝트 build**

**⚠️ 리액트 프로젝트 내의 .dockerignore 파일에 build 폴더가 없어야 함**

```bash
// 위치: 리액트 프로젝트 최상위
npm run build
```

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/86fbd785-a9b1-40ab-84fe-8ca394d62482/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230216T165630Z&X-Amz-Expires=86400&X-Amz-Signature=98eff118486f26d7f5bfc2b24944704be3fe37accbdf87f3fa6b80d81fe653e4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

리액트 프로젝트 내에 build 디렉터리 생성된 것 확인

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/91463c1f-f13e-4af1-a9d6-ca78bd514495/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230216T165701Z&X-Amz-Expires=86400&X-Amz-Signature=277b8e223962d7b2f4856504de0df1046e1dce6780a8ea69c607cdbc8e32f8ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

## Backend

<aside>
🔐 build.gradle

</aside>

```yaml
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.7.8'
    id 'io.spring.dependency-management' version '1.0.15.RELEASE'
}

group = 'com.ssafy'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'

    // https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-aws
    implementation group: 'org.springframework.cloud', name: 'spring-cloud-starter-aws', version: '2.2.6.RELEASE'

    implementation group: 'io.jsonwebtoken', name: 'jjwt', version: '0.9.1'
    implementation group: 'javax.xml.bind', name: 'jaxb-api', version: '2.3.1'

    // https://mvnrepository.com/artifact/io.openvidu/openvidu-java-client
    implementation group: 'io.openvidu', name: 'openvidu-java-client', version: '2.24.0'

    compileOnly 'org.projectlombok:lombok'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    runtimeOnly 'com.mysql:mysql-connector-j'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

<aside>
🔐 application.yml

</aside>

```yaml
spring:
  profiles:
    include: oauth, pay, s3

  jpa:
    hibernate:
      ddl-auto: none
      use-new-id-generator-mappings: true
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL5InnoDBDialect
        format_sql: true

  datasource:
    url: jdbc:mysql://i8b203.p.ssafy.io:3306/mydb?serverTimezone=Asia/Seoul&useSSL=false&tinyInt1isBit=false
    username: {username}
    password: {paswword}

  auth:
    jwt:
      secret-key: {key}
openvidu:
  https:
    url: {url}
    secret: {secret}
```

<aside>
🔐 application-oauth.yml

</aside>

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: {client-id}
            redirect-uri: https://i8b203.p.ssafy.io/api/login/oauth2/code/kakao
            client-authentication-method: POST
            authorization-grant-type: authorization_code
            scope: account_email
            client-name: Kakao
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
```

<aside>
🔐 application-pay.yml

</aside>

```yaml
kakao-pay:
    client-id: {client-id}
    domain: https://i8b203.p.ssafy.io/api/v1/pay
    react-url: https://i8b203.p.ssafy.io
```

<aside>
🔐 application-s3.yml

</aside>

```yaml
cloud:
  aws:
    credentials:
      accessKey: {acceeKey}
      secretKey: {secretKey}
    s3:
      bucket: hurry-up-push-bucket
    region:
      static: ap-northeast-2
    stack:
      auto: false
```

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/10c24e16-cc5c-4117-96ec-08c6d678596c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230216T165858Z&X-Amz-Expires=86400&X-Amz-Signature=07f75ac55cdde4e6e0bed95167900d3256b76a870152f69ef1b3ee091e8675bd&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
### Intellij에서 Gradle - FloraServer - Tasks - build에서 clean 후 build


---
# Docker 이미지 업로드 및 실행

### 1. docker build

- 위치: 리액트, 스프링 프로젝트 최상위
- 빌드 할 때마다 숫자 카운트 ++1 갱신(최신 버전 숫자는 도커 허브에서 확인)


```bash
# docker build -t [도커 허브 닉네임]/[레파지토리 이름]:[도커 이미지 파일 이름] .

docker build -t heenim0706/flora:spring-deploy-8 .
docker build -t heenim0706/flora:react-deploy-3 .
```

### 2. Docker Hub에 이미지 업로드

```bash
# docker push [도커 허브 닉네임]/[레파지토리 이름]:[도커 이미지 파일 이름]

docker push heenim0706/flora:spring-deploy-8
docker push heenim0706/flora:react-deploy-3
```

또는 Docker Desktop 이용

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2cacbf47-9824-4834-85e5-102f7423a062/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230216T170010Z&X-Amz-Expires=86400&X-Amz-Signature=5253e595755af5952accbb17513b0665bb98fa9cfa1268820077429bbc89e165&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

### 3. 빌드 파일 Docker Hub에서 내려받기

```bash
sudo docker pull heenim0706/flora:spring-deploy-8
sudo docker pull heenim0706/flora:react-deploy-3
```

### 4. Docker Container로 실행

```bash
sudo docker run --rm -d -p 3000:3000 --name react-deploy [docker 이미지 번호]
```

```bash
sudo docker run -d -p 8080:8080 --name spring-deploy [docker 이미지 번호]
```

```bash
# Seoul 시간으로 도커 컨테이너 시간 설정 옵션 추가
sudo docker run -it -e TZ=Asia/Seoul -d -p 8080:8080 --name spring-deploy [docker 이미지 번호]
```
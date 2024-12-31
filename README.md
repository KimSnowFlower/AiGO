# AiGO Project 준비
Team 평화의 보석함2 
<hr>

# 공부내용

# 1. HTTP Status 401 vs 403
<h3>HTTP 401</h3>
=> 클라이언트가 인증되지 않았거나, 유효한 인증 정보가 부족하여 요청이 거부되었음을 의미하는 상태값

<b>즉, 클라이언트가 인증되지 않았기 때문에 요청을 정상적으로 처리할 수 없다.</b>
<hr>

<h3>HTTP 403</h3>
=> 서버가 해당 요청을 이해했지만, 권한이 없어 요청이 거부되었음을 의미하는 상태값

<b>즉, 클라이언트가 해당 요청에 대한 권한이 없다는 것을 알려준다.</b>
<hr>

# 2. express.js 폴더 구조
<h3>Backend</h3>
|- node_modules <br> <hr>
|- src <br>
&ensp;|- config <br>  &emsp;|-> database.js <br>
&ensp;|- controllers <br> &emsp;|-> authController.js <br>
&ensp;|- middlewares <br> &emsp;|-> authMiddleware.js <br> &emsp;|-> validationMiddleware.js <br>
&ensp;|- routes <br> &emsp;|-> index.js <br> &emsp;|-> auth.js <br>
&ensp;|- services <br> &emsp;|-> authService.js <br>
&ensp;|- server.js <br> <hr>
|- .env <br> <hr>
|- package-lock.json <br> <hr>
|- pakcge.json <br> <hr>
|- README.md <br>
<hr>

# 3. server.js
<b>Express 애플리케이션을 설정하고 서버를 실행하는 중요한 역할</b>

<h3>3-1. 주요 역할과 동작</h3>

- Express 애플리케이션 생성 <br>
- 미들웨어 설정 <br>
- 라우팅 설정 <br>
- 서버 시작 <br>
<hr>
<h3>3-2. app.js와 server.js의 차이점</h3>

<b>app.js</b> <br>
- 보통 Express 애플리케이션의 핵심 로직이 담긴 파일
- 미들웨어, 라우트, 기타 설정 등을 관리
- 일반적으로 app 객체를 초기화하고, 라우터와 미들웨어를 설정
<br><br>

<b>server.js</b> <br>
- 서버를 시작하는 파일
- app.js에서 설정한 애플리케이션을 HTTP 서버와 결합 후 서버를 실행
- server.js가 존재하면, app.js는 Express 애플리케이션의 설정에 집중하고, server.js는 서버의 시작과 관련된 코드만 다룬다.

※ 이번 프로젝트는 server.js로 통일
<hr>

# 4. config 파일
<b>config 폴더는 프로젝트의 설정 파일들을 저장하는 용도로 사용</b> <br>
EX) 데이터베이스 연결, 환경 변수 설정, API 키, 서버 포트 번호 등

config <br>
|- database.js

database.js는 환경 변수(env)를 가지고 데이터베이스 연결 설정
<hr>

# 5. Middleware
<b>웹 서버에서 요청과 응답 사이에 실행되는 함수들 <br>
웹 프레임워크에서 클라이언트의 요청을 처리하는 중요한 역할 <br> </b>

<h3>5-1. 주요 역할</h3>

- 요청 데이터 처리 <br>
-> 클라이언트가 보낸 요청 데이터를 서버로 파싱

- 인증 및 권한 확인 <br>
-> 서버에 접근할 때 사용자가 인증되었는지 확인, 인증되지 않았다면 접근을 거부 혹은 로그인 페이지로 리다이렉션

- 로깅 <br>
-> 요청이 서버에 도달할 때마다 요청의 상세 정보를 로그로 남김

- 에러 처리 <br>
-> 에러가 발생하면 이를 잡아서 적절한 응답을 반환하거나, 로그로 기록

- 요청 수정 및 응답 변경 <br>
-> 요청 객체 (req)나 응답 객체 (res)를 수정하여 필요한 데이터를 추가하거나 변경

- CORS 설정 <br>
-> 다른 도메인에서 서버에 접근할 수 있또록 허용하는 CORS 미들웨어 사용 <br>
-> 다른 도메인에서 API 요청을 허용

- 요청 경로에 따른 분기 <br>
-> 특정 경로에 대해서만 미들웨어를 적용
<hr>
<h3>5-2. 미들웨어의 실행 흐름</h3>
-> 체인처럼 연결되어 순차적으로 실행 <br>
-> 하나의 미들웨어에서 next() 함수를 호출하면 다음 미들웨어가 실행 <br>
-> next()를 호출하지 않으면 미들웨어 체인이 종료 <br> <br>

<b>요청 처리:</b> 클라이언트가 요청을 보내면, 이 요청은 미들웨어들을 거쳐서 최종적으로 라우트 핸들러로 전달됩니다. <br>
<b>응답 처리:</b> 라우트 핸들러에서 처리된 결과는 다시 미들웨어를 거쳐 클라이언트로 응답됩니다.
<hr>

# 6. routes
<b>파일들에 경로를 나타나내는 폴더</b>

index.js는 모든 루트에 대한 경로를 나타낸다. <br>
그리고 auth.js처럼 하나의 기능에 대한 세부적인 경로가 필요하면 그때 새로운 js를 만들어 제작한다. <br> <br>

현 코드처럼 사용자가 /api/auth/login 경로를 타고 들어오면 <br>
index.js에서 경로를 확인하고 해당하는 /api 주소의 js로 보내서 최종적인 경로를 탐색한다.
<hr>

# 7. controllers
<b>사용자에 요청이 들어오면 적절한 응답을 위해 길을 인도해준다.</b>

요청 들어온 주소에 해당하는 컨트롤러를 찾고 <br>
해당 주소에 알맞는 기능을 응답한다. <br>

그렇기 때문에 Controller의 경우 비지니스 로직 구현이 아닌 <br>
요청한 값이 제대로 있는지 혹은 주소가 맞는지 체크하는 것이 중요하다.
<hr>

# 8. services
<b>해당 기능에 비지니스 로직을 구현하는 파일</b>

service는 해당 기능에 대한 비지니스 로직 <br>
즉, 실제적인 동작 코드를 구현하는 곳이다. <br>

컨트롤러에서 사용자가 요청한 기능을 확인하고 <br>
그것에 맞는 적절한 service를 사용하여 응답해야 한다! <br>
<hr>
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

# 2025/1/1 내용

<h3>1. authController 수정</h3>
Register와 Login Controller에 일부 코드를 DB 테이블에 맞추어 수정

<h3>2. validationMiddleware 수정</h3>
validation에서 DB 테이블에 맞게 NOT NULL인 것을 생각하여 수정

<h3>3. authService 수정</h3>
service 코드에서 sql 구문을 이용하여 수정<br>
erorr의 경우 thrown new Error로 처리<br>
<hr>

# 2025/1/2 내용

<h3>1. 필요한 package install</h3>
- mysql, twilio

<h3>2. config에 twilio.js 추가</h3>
- twilio에 필요한 SID와 token 사용하기 위한 코드 추가

<h3>3. auth 관련 코드들 수정</h3>
- authController는 기본적인 데이터 전달 코드 수정 <br>
- auth는 라우터에 send-code 부분 추가<br>
- authService는 로직 개선 및 sms 인증을 위한 코드 추가 및 회원가입 로직 수정<br>

<h3>4. verification_codes 테이블 추가</h3>
- sms 인증을 위한 테이블 추가

<h3>Issue</h3>
<b>이슈 내용: </b> <br>
E:\AiGO\src\services\authService.js:89 <br>
  sendVerificationCode, <br>
여러가지 이유를 찾아서 수정했지만 아직 고치지 못 했음.
<hr>

# 2025/1/3 내용

<h3>1. issue 해결</h3>
! npm start를 하면 계속 method is not defined가 나는 것이 문제였다.<br>
그 이유는 김평화가 제대로 exports를 이해하지 못하고 authController와 그 외 코드에 <br>
계속해서 module.exports를 작성하니 const로 만들어진 코드가 없는데 <br>
npm start로 코드를 실행하니 당연히 문제가 발생한 것이다. => 결론 김평화 바보<br>

<h3>2. exports의 그럼 무엇인가?</h3>
exports는 Node.js 모듈 시스템에서 사용되는 객체이며, 각 모듈에서 외부로 내보낼 값을 정의하는 데 사용한다.<br>
기본적으로 exports와 module.exports로 객체의 참조를 가리킨다.<br><br>

exports와 module.exports의 관계 <br>
module.exports는 모듈에서 실제로 내보낼 값을 지정하는 객체 -> 할당된 값은 require를 통해 다른 파일에서 가져올 수 있다. <br>
exports는 기본적으로 module.exports를 참조하는 객체이다. 즉, exports에 속성을 추가하면 module.exports에 자동으로 추가된다. <br>
=> 이 차이를 모르고 module.exports와 exports를 두개 다 사용해서 오류가 뜸. <br><br>

exports는 기본적으로 module.exports를 참조하고 있기 때문에, exports 객체에 속성을 추가하면 그 속성은 module.exports에도 반영된다.

exports의 주요 특징 <br>
- 기본 참조: exports는 기본적으로 module.exports와 동일하게 작동합니다. 하지만 exports에 값을 할당하거나 module.exports에 할당된 값을 직접 변경할 수 있습니다. <br>
- 속성 추가: exports에 속성이나 메서드를 추가하면 module.exports에 자동으로 반영됩니다. <br>
- 값을 변경하려면: exports 객체에 새로운 객체나 값을 할당하지 않도록 해야 합니다. 예를 들어, exports = {}를 하게 되면 exports가 module.exports와 분리되어 값을 내보낼 수 없게 됩니다. 이럴 경우에는 module.exports를 직접 사용하는 것이 좋습니다. <br>

exports와 module.exports의 차이점 <br>
- 속성 추가: exports는 속성을 추가하는 용도로만 사용하고, 값을 전체적으로 변경하려면 module.exports를 사용해야 합니다. <br>
- 재할당: exports를 완전히 다른 값으로 재할당하면 module.exports와 연결이 끊어져서 의도한 대로 동작하지 않게 됩니다. 반면, module.exports는 완전히 새로운 객체를 할당할 수 있습니다.
<hr>
<b>요약</b><br>

- exports는 기본적으로 module.exports의 참조로, 모듈의 속성이나 메서드를 외부로 내보내는 데 사용됩니다.
- exports.methodName과 같이 메서드를 추가하는 방식으로 여러 메서드를 내보낼 수 있습니다.
- 모듈의 반환값을 변경하려면 exports가 아니라 module.exports를 사용해야 합니다.
<hr>

# 2025/1/4 내용
<숙취 이슈 간단 코딩>

<h3>1. 비밀번호 변경 찾기 구현</h3>
changeUserPassword 구현 <br>
현 비밀번호와 신규 비밀번호만 가지고 변경 가능. <br>
여기서 지금 확인해야 하는 것은 비밀번호 잊어버려서 바꿔야 하는 경우도 구현 필요 <br>
<hr>

# 2025/1/5 내용

<h3>1. 카카오톡 로그인 기능 구현</h3>
카카오톡 Dev 회원가입 및 token 설정 <br>
카카오톡 로그인 기능 구현 및 콜백 리다이렉트 설정 <br>
하지만 프론트엔드에서 테스트 필요한 기능 <br>
<hr>

# 2025/1/6~13 내용

활동집 제작으로 인한 휴무.

# 2025/1/14 내용

authMiddleware = JWT Middleware 코드 수정

# 2025/1/15 내용

<h3>require('dotenv).config() 주의점</h3>
npm start으로 하면 require('dotenv').cofing()가 제대로 실행하지만, <br>
node server.js로 실행하면 undefined가 뜬다. <br>
그 이유는 둘의 실행 차이가 있다. <br>
package.json에서 npm start는 src/server.js까지 건들기 때문에 <br>
루트 파일과 모든 파일을 찾아서 로드하지만 <br>
node server.js는 package.json도 따로 없고 .env 파일과 다른 루트에 있기 때문에 <br>
루트 파일에 존재하는 .env를 쓰기 위해서는 정확한 위치를 명시해야 한다. <br> 
<hr>

require('dotenv').config({ path: '../.env' }); <br>
위처럼 정확한 경로를 알려주고 설정해야 node server.js로 실행하면 <br>
정확하게 .env -> config 파일들에 정보가 넘어간다. <br>
이 이유를 몰라서 강냉톤에서도 실수하고 지금도 실수했다. <br>
정확하게 알아둘 것. <br>
나는 그냥 node server.js를 익숙하게 사용하다보니 틀릴 수 있는 문제였다. <br>
되도록 그냥 npm start를 사용하자
<hr>

<h3>카카오맵 api 기본 테스트 완성</h3>
카카오맵 기본 api 생성 완료 <br>
주소 : /api/location/get-location <br>
테스트는 오로지 백엔드 JSON 결과만 봄 <br>
!!하지만 이게 화면에 잘 나오는지 확인 필요!! <br>
<hr>

<h3> API TEST 완료</h3>
- /api/auth/register : 회원가입 하기<br>
- /api/auth/login : 로그인 하기<br>
- /api/location/get-location : 카카오톡 맵 가져오기<br>

# 2025/1/16 내용

휴무
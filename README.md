## **현재까지의 문제점**

-   ~multerS3에서 **'S3' 형식은 'S3Client' 형식에 할당할 수 없습니다.ts(2322)** 에러가~ ~발생한다.~
    -  tsconfig.json에 "module": "ESNext" 를  "module":"CommonsJS" 로 변경하여 require 구문을 이용해 불러와서 사용으로 오류를 해결해둠.
-   ~현재 Bookmark 테이블의 **'Bookmark\[\]' 형식에 'is\_marked' 속성이 없습니다.ts(2339)**~ ~에러가 발생한다.~  
    - 데이터를 깔끔하게 보내고싶어서 사용했던 .map 함수를 제거 후, findOne 으로 데이터를 보내주는 방식으로 변경
-   mysql 데이터를 가지고오기 위한 index.js 파일을 .ts 로 변경시 **'Error: No Sequelize instance passed'** 문제 발생  
    - .js파일인 상태로 유지
-   회원가입 시, 데이터베이스에 경위도를 저장하게끔 로직을 만들었는데 경위도를 읽지 못하는 에러

## **앞으로 계획하고 있는 것**

-   Nextfunction을 활용하여 오류핸들링하기
-   jwt.verify를 router로 옮겨 모든 파일에 있는 accessToken 확인하는 코드 줄이기
-   socket.io로 실시간 알람 만들기
-   현재 페이지네이션이 1~끝까지 모두 읽혀오는 코드로 작성되있으나, 1페이지마다 데이터를 불러오게끔 변경하기
-   mysql 데이터를 가지고오기 위한 index.js 파일을 .ts 로 변경시 'Error: No Sequelize instance passed' 문제 발생하는 원인 파악 후 변경 시도

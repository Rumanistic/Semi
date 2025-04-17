# 🚀팝스팟 (Pop-up Store Introduction and Review Service)






### 📃 프로젝트 소개
> 많은 팝업 스토어를 한눈에 확인 할 수 있는 소개 서비스 시스템

### 📅 제작기간
>  2024.08.24 ~ 2024.09.30

### 🦸‍♂️ 참여 인원
4명

### 🚀 Stacks
<div> 
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle DB">
</div>
<div> 
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java">   <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=jpa&logoColor=white" alt="JPA"> </div>
<div> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap"> 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML"> 
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"> </div>
<div> 
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code">
  <img src="https://img.shields.io/badge/SQL%20Developer-4479A1?style=for-the-badge&logo=oracle&logoColor=white" alt="SQL Developer">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"> 
</div>

---
### 📊 프로젝트 설계

<details>
<summary>ERD</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://raw.githubusercontent.com/0biin0/0biin0/main/image/uml_popspot.png" width="800px"/>
</div>
</details>


---

### 🖥️ 기능 소개 및 시연
#### 1. 로그인/회원가입

#### ⭐ 로그인 기능
<h3>🔐 로그인 기능 시연</h3>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ca6cb51f-2d0c-4f84-908c-d1101613670c" width="600"/>
</p>

<ul>
  <li>모든 페이지에서 <strong>로그인 버튼 클릭 시 로그인 화면</strong>으로 이동</li>
  <li>로그인 성공 시 <code>sessionStorage</code>에 <code>userId</code>, <code>name</code>, <code>permissions</code> 저장</li>
  <li>사용자 권한은 <code>user</code>, <code>admin</code>, <code>planner</code> 중 하나 이상</li>
  <li>로그아웃 시 <code>sessionStorage.clear()</code>로 정보 삭제</li>
</ul>

#### 회원가입/회원탈퇴
## 📝 회원가입 기능 시연

<p align="center">
  <img src="./assets/signup.gif" width="600"/>
</p>

> 아이디 중복 체크 및 유효성 검사 → 사용자가 입력한 아이디, 이메일, 비밀번호, 생년월일, 전화번호 등의 유효성을 검사하고, 아이디 중복 여부를 확인<br>
> 회원 정보 저장 및 서버 전송 → 입력된 정보를 userData에 저장하고, 모든 필드가 유효하면 서버에 회원가입 요청을 전송<br>
> 계정 타입 선택 및 회원가입 처리 → 사용자는 관리자, 기획자, 사업자, 일반 사용자 중 계정 타입을 선택해야 하며, 가입 완료 시 로그인 페이지로 이동<br>
> 회원 정보 입력 및 유효성 검사 → 아이디, 비밀번호, 전화번호, 이메일을 입력받고, 모든 필드가 채워졌는지 확인<br>
> 탈퇴 확인 및 요청 전송 → 사용자가 탈퇴를 확정하면 서버에 탈퇴 요청을 보내고, 성공 시 회원 데이터 삭제<br>
> 로그아웃 및 페이지 이동 → sessionStorage를 초기화하여 로그아웃 처리 후, 메인 페이지로 이동하고 페이지를 새로고침<br>

#### 마이페이지
> 회원 정보 조회 및 수정 → 비밀번호 확인 후 회원 정보를 조회하고, 수정 모드에서 이름, 이메일, 전화번호 변경 가능<br>

#### 2. 📺메인 페이지

#### 메인페이지 기능
> 이벤트 데이터 불러오기: 서버에서 최근 8개의 이벤트 데이터를 가져와 banners(3개)와 lists(5개)로 분리하여 저장<br>
> 배너 자동 변경: 5초마다 setInterval을 이용해 배너가 자동으로 변경되며, 좌우 버튼으로 수동 조작 가능<br>
> 이벤트 리스트 슬라이드: 리스트형 이벤트를 좌우 버튼으로 스크롤하며 탐색할 수 있도록 구현<br>
> 태그 필터링 및 이동: 이벤트 태그 클릭 시 setTagEvent를 실행하여 태그 필터링 후 관련 페이지로 이동<br>
> 이미지 URL 처리: 이벤트 데이터에서 이미지 정보를 추출하여 동적으로 이미지 경로를 생성하고 표시<br>



#### 3. 📱 리스트 페이지
> 팝업스토어 데이터 로드 & 태그 필터링 기능 → 서버에서 이벤트 리스트를 가져오고, 태그 선택 시 해당 태그의 이벤트만 표시
> 리스트 & 카드 뷰 변경 → 버튼 클릭으로 리스트 또는 카드 형태로 전환하여 이벤트 탐색 가능
> 이벤트 상세 페이지 이동 → 리스트/카드 클릭 시 해당 이벤트의 상세 페이지로 이동

#### 4. ⭐️⭐️⭐️ 🔍 상세 페이지/리뷰페이지
#### 상세페이지 기능
> 이벤트 정보 불러오기 → useParams로 이벤트 번호(no)를 받아와 axios.get으로 이벤트 상세 정보 조회<br>
> 이벤트 수정 및 삭제 → 이벤트 작성자만 수정(doEdit), 삭제(doDelete) 가능<br>
#### ✍️리뷰 페이지
> 리뷰 작성 & 제출 → 로그인한 사용자가 리뷰를 작성하고 평점 선택 후 제출<br>
> 리뷰 수정 및 삭제 → 본인이 작성한 리뷰만 수정 및 삭제 가능<br>
> 리뷰 목록 불러오기 → 해당 이벤트의 모든 리뷰를 axios.get으로 가져와 리스트로 표시<br>

### 5. QnA 
> 1:1 고객 문의 등록 및 관리 → 사용자가 로그인 후 문의사항을 등록할 수 있으며, 비공개 설정도 가능 / 관리자는 문의 사항에 대해 답변 작성 및 수정 가능<br>
> FAQ 목록 조회 및 관리 → 사용자들이 자주 묻는 질문을 FAQ 리스트에서 확인 가능 / 관리자는 FAQ를 추가/수정/삭제 가능, 동적인 FAQ 관리 가능<br>
> 문의 내역 상세 조회 및 권한별 접근 제한 → 일반 사용자는 본인의 문의 사항만 열람 가능, 관리자는 모든 문의 사항 확인 가능 / 비공개 문의 사항은 작성자 또는 관리자만 접근 가능하도록 설정<br>


## 장점
### 1. 접근성
> 태그 필터링, 리스트 & 카드 뷰 전환 기능으로 사용자가 원하는 팝업스토어를 빠르게 탐색 가능<br>
> 팝업스토어의 위치, 운영 시간, 리뷰 정보를 한눈에 확인 가능하여 정보 접근이 용이 <br>

### 2. 확장성
> 사용자 권한(일반, 기획자, 관리자)에 따라 기능을 차별화하여 보안성과 관리 효율성 강화<br>
> 리뷰, 이벤트 등록, 문의사항 관리 등 다양한 기능을 추가할 수 있는 구조로 유지보수 및 확장 용이<br>

### 3. 최적화
> 렌더링 최소화 및 컴포넌트 분리로 빠른 로딩 속도와 부드러운 UX 제공
> 서버 API 최적화 및 필요 데이터만 불러오는 방식으로 성능을 극대화


---


## 🛠 보완점 


## 📌 PopSpot의 개선이 필요한 기능 & 제안사항

<details>
  <summary>🟦 검색 기능 강화</summary>
  <div markdown="1" style="padding-left: 15px;">
  - 현재 태그 필터링은 있지만, **키워드 검색 기능 추가** 필요.
  - 사용자가 **팝업스토어 이름, 위치, 카테고리로 검색 가능하도록 개선**하면 탐색이 훨씬 편리해짐.
  </div>
</details>

<details>
  <summary>🟦 리뷰 신뢰도 향상</summary>
  <div markdown="1" style="padding-left: 15px;">
  - 현재 리뷰는 모든 사용자가 작성 가능하지만, **실제 방문 인증 기능 추가**하면 신뢰도가 높아짐.
  - **좋아요/싫어요 기능 추가**하여 유용한 리뷰가 상단에 노출되도록 개선 가능.
  </div>
</details>

<details>
  <summary>🟦 이벤트 & 리뷰 관리 최적화</summary>
  <div markdown="1" style="padding-left: 15px;">
  - 이벤트 수정/삭제는 작성자만 가능하지만, **관리자가 특정 리뷰나 이벤트를 관리할 수 있는 기능 추가** 필요.
  - **댓글 기능 추가**로 리뷰에 대한 피드백 가능하도록 개선하면 더 활발한 사용자 참여 유도 가능.
  </div>
</details>

<details>
  <summary>🟦 마이페이지 기능 확장</summary>
  <div markdown="1" style="padding-left: 15px;">
  - 현재 마이페이지에서 회원 정보 수정만 가능하지만, **내가 찜한 팝업스토어, 작성한 리뷰, 문의 내역 확인 가능하도록 추가**하면 편의성 증가.
  </div>
</details>

<details>
  <summary>🟦 푸시 알림 or 메일링 시스템 도입</summary>
  <div markdown="1" style="padding-left: 15px;">
  - **새로운 팝업스토어 오픈 소식, 인기 이벤트, 할인 정보 등을 알림으로 제공**하면 사용자 재방문율 상승.
  - 이메일 구독 기능을 추가하여 **맞춤형 팝업스토어 추천**도 가능.
  </div>
</details>


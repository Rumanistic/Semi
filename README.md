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

 ![image](https://github.com/user-attachments/assets/68cb0cae-782e-416d-bfb5-38ec32b86227)

#### ⭐ 로그인 기능
> 모든 페이지에서 로그인/회원가입 버튼 클릭 시 모달창이 활성화됨. <br>
> 모달 내에서 사용자 입력을 처리하고 서버로 로그인/회원가입 요청 전송.<br>
> 로그인 성공 시 모달창이 자동으로 닫히고, 사용자 상태를 업데이트.<br>
> 로그인 성공 시 브라우저의 세션 스토리지에 userId 및 token을 저장.<br>

#### 2. 메인 페이지
![image](https://github.com/user-attachments/assets/1132232a-8685-4678-89ee-8f0a0d85c8db)
 
![맛탐정메인페이지2](https://github.com/user-attachments/assets/60923e4a-e05b-4f9c-816a-4c30d76178df)

#### ⭐ 메인페이지 기능
> 각각의 지역 태그에 맞는 데이터를 서버 API를 통해 화면에 표시 <br>
> 초기에 데이터 10 개 이후 더보기를 통하여 10개씩 추가 로드<br>
> 지도 Component를 만들어 db에 저장된 상호명 및 가게 위치를 전송할 경우 지도에 마킹 및 이미지 로드하도록 구성<br>

#### 3. 검색 기능
![image](https://github.com/user-attachments/assets/c7d01f63-9298-4010-892f-b9ab0e3cb505)


#### ⭐ 검색기능
> 카테고리 및 메뉴, 상호명을 통한 검색 기능<br>
> 초기 10개의 리뷰들과 위치를 지도에 표시 후 더보기 이후에 추가적으로 표시<br>
> DB에 저장된 위치데이터를 통한 지도 표시 <br>

#### 4. 상세페이지
![image](https://github.com/user-attachments/assets/09f3abce-e4c2-4b70-89d6-fbcf819f1e1d)
#### ⭐ 검색기능
> 한눈에 각 플랫폼의 별점 및 리뷰 확인 가능<br>
> 해당 상호명의 상세정보 및 메뉴 확인 가능<br>
> 로그인시 맛탐정을 통해 리뷰 등록 가능<br>

#### 5 마이페이지
![image](https://github.com/user-attachments/assets/b2765aee-10ab-4d14-9764-f03d96e6cac3)
#### ⭐ 마이페이지 기능
> 자신이 쓴 가게의 리뷰들 한눈에 확인 및 삭제 가능<br>
> 자신의 정보 확인 및 수정 가능 <br>


---


## 장점
### 1. 편리성
> 가게 위치와 별점 정보를 한눈에 확인 가능<br>
>  핫플레이스 추천으로 유동인구가 많은 지역 맛집을 빠르게 추천.<br>
### 2. 효율성
> 3개 플랫폼의 리뷰를 한 번에 비교
> 대표 메뉴와 상세 정보들을 직관적으로 제공.
### 3. 최적화
> 랜더링 최소화.
> 컴포넌트 분리로 유지보수 용이.


---


## 🛠 보완점 및 업데이트 방안


### 기능 개선

  <details>
  <summary>🟦 좋아요 및 즐겨찾기 기능</summary>
  <div markdown="1" style="padding-left: 15px;">
  </div>
  </details>

  <details>
  <summary>🟦 관리자 기능 강화</summary>
  <div markdown="1" style="padding-left: 15px;">
  </div>
  </details>
  
  <details>
  <summary>🟦 인증 로직 개선</summary>
  <div markdown="1" style="padding-left: 15px;">
  <img src="https://github.com/user-attachments/assets/a8c0942a-802a-468f-9b5a-4525d6e2dfba" width="800px"/>
  </div>
  </details>

  <details>
  <summary>🟦 크롤링 서버 보완</summary>
  <div markdown="1" style="padding-left: 15px;">
  </div>
  </details>

### 배포 및 자동화
  ![image](https://github.com/user-attachments/assets/2211c8d0-eec1-4052-a2d3-5c74a9760783)

  🟦 Webhook 및 배포 스크립트 활용.<br>
  🟦 Jenkins 기반 자동화.<br>

---

### 📒 PPT 자료 
> https://docs.google.com/presentation/d/1-s8vOfzKKHzodYbKO7sFSzIn3RLcHxFrcbpgBrRlwzk/edit?usp=sharing



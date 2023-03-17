# OMM (Oh My Match!)

## 팀 소개

### 팀 이름: 이공팔청춘

### [노션 링크](https://season-antique-3b8.notion.site/Oh-My-Match-OMM-c59fde70ab3f4108b7114590e5133951)

<br>

### 팀원
* 박성완 (팀장, PM, BE)
* 안수빈 (BE, PL, Infra)
* 김윤미 (BE, Infra, Git)
* 최보영 (FE, PL, UX/UI)
* 임양원 (FE, UX/UI)
* 원채령 (FE, UX/UI)

<br>

---

<br>

## 프로젝트 소개

### 서비스 개요

**소개팅 상대 매칭 시스템**

1. DID를 활용한 회원 등록
2. 등본, 차량, 자격등, 건강 진단서 등 개인 추가 정보 등록
(좀 더 상세한 매칭을 위함)
3. 매칭 추천 기능 (사용자 입력 정보, 매칭 이력 기반)
4. 매칭 중 채팅
5. 매칭 후 평가
6. 신고
7. 애프터 신청

<br>

### 프로젝트 특장점
1. 본인인증을 위한 얼굴인식 및 인증
    - 회원가입, 매칭 성사 직전에 얼굴인증 진행
    - DB와 비교하여 회원 확인

2. 신분증 OCR 읽기 
    - 가상인증센터 가입 시 신분증을 OCR 로 읽어서 DB와 비교

3. 블록체인 DID로 회원 인증 정보 관리
    - 회원이 가상인증센터에서 특정 인증서를 요청하면, 본인인증을 진행한 후, 해당 인증서를 DID로 전송
- DID 읽기/쓰기 기능

4. 채팅, 알림 데이터를 Redis로 관리
    - DB의 빠른 접근 및 수정을 위해 Redis 사용

<br>

---

<br>

## 요구사항 명세서

[요구사항 명세서](https://season-antique-3b8.notion.site/1bd4263d7dfb46d88b78510eda07b039)

<br>

## API 설계

[API 설계](https://season-antique-3b8.notion.site/API-8dc590a2b0a043e9a77972d5b3cf54b4)

<br>

## Flow Chart

![flowchart-flow chart(통합) drawio](https://user-images.githubusercontent.com/75800620/225800505-bd09e921-dfe6-44f0-aaab-7b0b2a1de9ae.png)

<br>

## 아키텍처 설계도

![image](https://user-images.githubusercontent.com/75800620/225800606-4d4550e0-b395-4188-8743-ed1301f7e6ac.png)

<br>

## Design 논의

[Design 논의](https://season-antique-3b8.notion.site/Design-8eaa684cc26142488ecc45473e5650ea)

<br>


## ERD

![image](https://user-images.githubusercontent.com/75800620/225800773-2d2245a5-450d-4fc2-b391-490584d6de6f.png)

<br>

## 피그마 화면

![image](https://user-images.githubusercontent.com/75800620/225801059-64892ed3-a2aa-48d4-a7f6-8719c33c4360.png)
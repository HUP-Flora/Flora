<img src="https://user-images.githubusercontent.com/89143804/219468504-887cdaf7-7ab6-4f7c-a17c-5ded7d71ed33.png" />

<br />


# **꽃으로 전하는 가장 빠른 마음, 🌸 FLORA 🌸**

<br />

## 1️⃣ 서비스 설명

### ❤ **개요**
  
  - 실시간 커스텀 꽃 판매 서비스

### 💘 **타겟**

  - 꽃을 쉽고 빠르게 배달 또는 픽업하고 싶으신 분
  - 온라인으로도 꽃다발을 내 마음대로 커스텀하고 싶으신 분

<br />

## 2️⃣ 기획 배경

### 🎨 **배경**

  - 기존 온라인 꽃배달은 가게에 꽃을 주문하기 위해 거쳐야할 불필요한 과정들이 너무 많고, 주문한 이후 상품 이미지와는 전혀 다른 꽃을 받거나 상태가 좋지 않은 꽃을 받는 등 좋지 않은 경험을 하신 분들이 많았습니다.
  - 온라인으로는 가게에서 미리 구성해둔 꽃으로만 구매할 수 밖에 없고 채팅을 통해 구성 변경을 시도하면 제 때 답장을 받을 수 없는 경우가 많았습니다.

### 💡 **목적**

  - 온라인 꽃배달을 이용하려는 사용자들에게 쉽고 빠른 주문 서비스를 제공하고, 온라인으로도 상품 구성을 원하는 대로 변경하여 꽃 선물에 정성과 의미를 담아 보낼 수 있게 함을 목적으로 합니다.

<br />

<br />

## 3️⃣ 프로젝트 환경

<br />

### 📂 **디렉토리 구조**

<br />

<img src="https://user-images.githubusercontent.com/89143804/219456258-71b9b29b-8df4-4f7e-ae1a-ded71873971d.png" />

<br />

<br />

### 🏞️ **개발 환경**

<br />

<img src="https://user-images.githubusercontent.com/89143804/219468204-953ad944-58f5-4c04-be24-41e17bb5ea96.png" />

<img src="https://user-images.githubusercontent.com/89143804/219456995-fa47ff1a-f399-4371-85b0-d3e93bb903e1.png" />

<br />

## 4️⃣ 설계

<br />

### 🛠️ **기술 스택**

<br />

<img src="https://user-images.githubusercontent.com/89143804/219460001-545e83bd-17ac-438e-99fe-7b76a31719ce.png" />

<br />

### 📄 **ERD**

<br />

<img src="https://user-images.githubusercontent.com/89143804/219458257-fe94696c-8fe3-4d28-8c35-d7851b0f8473.png" />

링크 : [Flora_ERD](https://www.erdcloud.com/d/3nCdBkv5uTrdcWrom)

<br />

### 💻 **ProtoType**

<br />

<img src="https://user-images.githubusercontent.com/89143804/219458653-db35269a-10f4-44da-be5c-7ac27af3791f.png" />
<img src="https://user-images.githubusercontent.com/89143804/219458874-70309d74-8072-4b23-ad49-84bcb581f1d6.png" />

링크 : [Flora_ProtoType](https://www.figma.com/file/YsAf1u8pbz4To7Y1SG0GbJ/ssafy_3%ED%8C%80_%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B3%B4%EB%93%9C?node-id=352%3A6&t=04nX8r3t9uLi3Bw7-1)

<br />

## 5️⃣ 서비스 화면

<br />

### **1. 로그인 및 메인 페이지**

- 카카오 소셜 로그인을 지원합니다.
- 로그인 시 JWT를 이용하여 AccessToken 및 Refresh 토큰을 서버로부터 전달받습니다.
  
<img src="https://user-images.githubusercontent.com/89143804/219421974-137e0bab-fef2-46d4-8d4d-8763b66d2cb7.gif" />

<br/>

### **2. 꽃집 검색 페이지**

- 달력 모달에서 날짜 선택 시 꽃집 목록 중 해당 요일에 쉬지 않는 꽃집들만 표시해줍니다.
- 주소 입력 모달에서 키워드 검색 시 DB에 저장되어 있는 꽃집들의 주소 중 해당 키워드가 포함되어 있는 주소 목록을 표시해줍니다.

<img src="https://user-images.githubusercontent.com/89143804/219425347-312e7852-3ba0-42e1-abbe-44fd3d63c9cd.gif" />

<br/>

### **3. 꽃집 상세 및 상품 상세 페이지**

- 선택한 꽃집의 상세 정보를 나타내어줍니다.
- 플로라이브를 이용할 수 있고 마음에 드는 꽃집일 경우 꽃갈피라는 찜 목록에 추가할 수 있습니다.

<img src="https://user-images.githubusercontent.com/89143804/219425762-40926ed6-2074-4be2-879e-0772bc59dcee.gif" />

<br/>

### **4. 플로라이브 - 즉시 신청**

- 사장님께 즉시 플로라이브를 신청할 수 있습니다.

<img src="https://user-images.githubusercontent.com/89143804/219431709-46061687-440e-4d7c-9b85-f7663909c92d.gif" />

<br/>

### **5. 플로라이브 - 예약**

- 원하는 날짜에 플로라이브를 이용하고 싶을 때 사용합니다.

<img src="https://user-images.githubusercontent.com/89143804/219433053-d3e5bb47-72cb-4c5e-b767-bed5037d65b8.gif" />

<br/>

### **6. 플로라이브 - 라이브 진행**

- 프로젝트의 핵심 기능인 WebRTC 기반 영상 통화입니다.
- 사용자는 사장님의 화면을 보며 특정 꽃이나 장식품들을 추가 및 제거할 수 있습니다.
- Socket.io를 이용한 채팅도 함께 구현되어 있으며, 결제 폼을 작성하거나 목소리를 낼 수 없는 특수한 상황일 경우 유용하게 쓰입니다.

- 추후 업로드

<br />

### **7. 플로라이브 - 폼 작성 및 확인**

- 사장님께서 폼 버튼을 누르면 결제 폼이 채팅창에 표시되고, 이를 모두 적어 확인 창에서 결제하기를 누르면 카카오 결제 api로 redirect됩니다.

- 추후 업로드

<br />

### **8. 플로라이브 - 결제 및 주문 완료**

- 결제 완료 시 주문 완료 페이지로 이동하며, 만약 실패 또는 취소 시 해당 주문 상세 페이지로 

- 추후 업로드

<br />

### **9. 마이페이지**

<img src="https://user-images.githubusercontent.com/89143804/219435194-b496f1de-2ad2-4dff-bd69-c9d9e20fb14b.gif" />

<br/>

### **10. 리뷰 작성 페이지**

<img src="https://user-images.githubusercontent.com/89143804/219436195-edb8c0c2-8eb6-4396-a4ae-3ad86cc1a471.gif" />

<br/>

### **11. 사용자 주문 상세 페이지 (재결제)**

- 추후 업로드

<br />

### **12. 사장님 주문 상세 페이지**

<img src="https://user-images.githubusercontent.com/89143804/219439328-c0e641a1-c4e1-4a9d-a4db-3c911aafb6bc.gif" />


<br />

## 6️⃣ 팀원 소개

<br />

<img src="https://user-images.githubusercontent.com/89143804/219464594-4f8079cf-9350-462b-9a1a-02f6896dabef.png" />

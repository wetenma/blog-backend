# 📝 블로그 백엔드 프로젝트

이 프로젝트는 **Express.js**, **TypeORM**, **MySQL**을 기반으로 만든 블로그 API 서버입니다.  
JWT를 이용한 사용자 인증과 게시글, 댓글, 좋아요 기능까지 모두 구현되어 있으며, 최종적으로 Render를 통해 배포하였습니다.

## 🚀 프로젝트 개요

- 사용자 인증 (회원가입/로그인)
- 게시글 CRUD
- 댓글 작성
- 게시글 좋아요 기능
- JWT를 통한 인증 보호
- RESTful API 방식 설계

## 🛠 사용 기술 스택

| 구분 | 기술 |
|------|------|
| 언어 | TypeScript |
| 백엔드 프레임워크 | Express.js |
| ORM | TypeORM |
| 데이터베이스 | MySQL |
| 인증 방식 | JWT (JSON Web Token) |
| 배포 | Render |
| 기타 | Postman, Thunder Client (API 테스트용) |

## 📂 프로젝트 구조

```
blog-backend/
├── src/
│   ├── controllers/      # 요청 처리 로직
│   ├── entity/           # TypeORM 엔티티
│   ├── middleware/       # 인증, 에러 처리 등 미들웨어
│   ├── routes/           # API 라우터
│   ├── utils/            # 유틸리티 함수
│   └── app.ts            # Express 앱 초기화
├── ormconfig.ts          # DB 연결 설정
├── .env                  # 환경변수
├── package.json
└── README.md
```

## ✅ 주요 기능

### 👤 사용자 기능
- 회원가입 (`POST /auth/register`)
- 로그인 및 JWT 발급 (`POST /auth/login`)
- 로그인한 사용자만 게시글 작성/수정/삭제 가능

### 📝 게시글 기능
- 게시글 작성 (`POST /posts`)
- 게시글 목록 조회 (`GET /posts`)
- 게시글 상세 조회 (`GET /posts/:id`)
- 게시글 수정 (`PATCH /posts/:id`)
- 게시글 삭제 (`DELETE /posts/:id`)

### 💬 댓글 기능
- 게시글에 댓글 작성 (`POST /posts/:id/comments`)

### ❤️ 좋아요 기능
- 게시글 좋아요 추가/취소 (`POST /posts/:id/like`)
- 로그인한 사용자만 가능

## 🔐 인증 방식

- 로그인 시 JWT 발급 → `Authorization: Bearer <token>` 헤더에 포함시켜 요청
- 인증 미들웨어를 통해 사용자를 식별하고 권한 확인 수행

## 🔧 설치 및 실행

1. 프로젝트 클론
   ```bash
   git clone https://github.com/your-username/blog-backend.git
   cd blog-backend
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 환경 변수 설정
   `.env` 파일 생성 후 다음과 같이 입력:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=yourpassword
   DB_NAME=blog
   JWT_SECRET=your_jwt_secret
   ```

4. 서버 실행
   ```bash
   npm run dev
   ```

## 🧪 API 테스트

Thunder Client 또는 Postman을 사용하여 다음 엔드포인트 테스트:

| 메소드 | 경로 | 설명 |
|--------|------|------|
| POST | /auth/register | 회원가입 |
| POST | /auth/login | 로그인 |
| GET | /posts | 게시글 목록 조회 |
| GET | /posts/:id | 게시글 상세 조회 |
| POST | /posts | 게시글 작성 |
| PATCH | /posts/:id | 게시글 수정 |
| DELETE | /posts/:id | 게시글 삭제 |
| POST | /posts/:id/comments | 댓글 작성 |
| POST | /posts/:id/like | 좋아요 토글 |

## 📦 배포

- Render를 통해 배포 완료
- API 접근 URL: `https://your-app-name.onrender.com`

---

**개발자**: [김수현](https://github.com/wetenma)  
**라이선스**: MIT


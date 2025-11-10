const pool = require('../config/db');

async function createUser(stunum, username, password, role) {
    const sql = 'INSERT INTO users (stunum, username, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(sql, [stunum, username, password, role]);
    return result.insertId;
}

async function findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.query(sql, [username]);
    return rows[0];
}

module.exports = { createUser, findByUsername };



//


































// backend/
// ├── app.js                 # 서버 시작점, 미들웨어 연결, 라우터 등록
// ├── package.json           # 프로젝트 정보, 설치 패키지 관리
// ├── .env                   # DB 정보, 비밀키 등 환경 변수 저장
// ├── config/                # 설정 관련 폴더
// │    └── db.js             # MySQL DB 연결 설정
// ├── routes/                # URL별 요청 처리 라우터
// │    ├── auth.js           # /auth 경로, 회원 관련 라우팅
// │    ├── labels.js         # /labels 경로, 그룹/라벨 관련 라우팅
// │    └── notices.js        # /notices 경로, 공지 관련 라우팅
// ├── controllers/           # 요청 처리 + 모델 호출 → 응답 반환
// │    ├── authController.js # 회원 CRUD 로직 처리
// │    ├── labelController.js# 그룹/라벨 CRUD 로직 처리
// │    └── noticeController.js # 공지 CRUD 로직 처리
// ├── models/                # DB 쿼리 실행, 데이터 처리
// │    ├── userModel.js      # users 테이블 CRUD
// │    ├── labelModel.js     # gbsw_group 테이블 CRUD
// │    └── noticeModel.js    # notices 테이블 CRUD
// ├── middlewares/           # 요청 전처리/인증/권한 처리
// │    └── authMiddleware.js # 로그인/권한 체크
// └── utils/                  # 공통 유틸 함수
// └── dateFormatter.js   # 날짜 포맷, 변환 등
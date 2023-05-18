## gaMeZone API 명세서

---

### <b>유저 명세</b>

| Method | URI                    | Description      |
| ------ | ---------------------- | ---------------- |
| POST   | /api/users/sign-up     | 회원가입         |
| POST   | /api/users/login       | 로그인           |
| POST   | /api/users/admin-login | 관리자) 로그인   |
| GET    | /api/users/:userId     | 사용자 정보 조회 |
| PUT    | /api/users/:userId     | 사용자 정보 수정 |
| DELETE | /api/users/:userId     | 사용자 정보 삭제 |

### <b>게임 명세</b>

| Method | URI                      | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | /api/products            | 모든 상품 정보 조회  |
| GET    | /api/products/:name      | 특정 상품 조회       |
| POST   | /api/products/add        | 새로운 상품 등록     |
| PATCH  | /api/products/:productId | 특정 상품 정보 수정  |
| DELETE | /api/products/:name      | 특정 상품 정보 삭제  |
| GET    | /api/categories          | 전체 카테고리 조회   |
| GET    | /api/categories/:name    | 특정 카테고리 조회   |
| POST   | /api/categories/add      | 새로운 카테고리 등록 |
| PUT    | /api/categories/:name    | 특정 카테고리 수정   |
| DELETE | /api/categories/:name    | 특정 카테고리 삭제   |

### <b>게시물 명세</b>

| Method | URI                | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | /api/posts         | 전체 게시물 조회        |
| GET    | /api/posts/:userId | 특정 유저의 게시물 조회 |
| POST   | /api/posts         | 새 게시물 생성          |
| PATCH  | /api/posts/:postId | 특정 게시물 수정        |
| DELETE | /api/posts/:postId | 특정 게시물 삭제        |

### <b>댓글 명세</b>

| Method | URI                        | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | /api/comments/post/:postId | 특정 게시물의 모든 댓글 조회 |
| GET    | /api/comments/:userId      | 특정 유저의 모든 댓글 조회   |
| POST   | /api/comments              | 새로운 댓글 생성             |
| PATCH  | /api/comments/:commentId   | 특정 댓글 수정               |
| DELETE | /api/comments/:commentId   | 특정 댓글 삭제               |
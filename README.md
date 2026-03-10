# Movie App Auth

NestJS backend с JWT-авторизацией, Prisma ORM, PostgreSQL.

## Установка и запуск

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

## Переменные окружения

Создайте файл `.env` на основе `.env.example`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/movies?schema=public
JWT_SECRET=your_jwt_secret
JWT_ACCESS_TOKEN_TTL=3h
JWT_REFRESH_TOKEN_TTL=7d
COOKIE_DOMAIN=localhost
```

## API Endpoints

### POST /auth/register
Регистрация нового пользователя.
```json
{ "email": "user@mail.com", "name": "User", "password": "123456" }
```

### POST /auth/login
Авторизация по email и паролю. Возвращает `accessToken`, устанавливает `refreshToken` в HttpOnly cookie.
```json
{ "email": "user@mail.com", "password": "123456" }
```

### POST /auth/refresh
Обновление access token через refresh token из cookie.

### POST /auth/logout
Удаление refresh token cookie.

### GET /auth/me (защищённый)
Возвращает id текущего пользователя. Требует заголовок `Authorization: Bearer <accessToken>`.

## Примеры запросов (curl)

### Login success
```bash
curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@mail.com","password":"123456"}'
```
Ответ: `{"accessToken":"<jwt_token>"}`

### Login fail (неверный пароль)
```bash
curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@mail.com","password":"wrong"}'
```
Ответ: `{"message":"Неверный email или пароль","error":"Unauthorized","statusCode":401}`

### Protected route success
```bash
curl -s http://localhost:3000/auth/me \
  -H "Authorization: Bearer <accessToken>"
```
Ответ: `{"id":1}`

### Protected route without token
```bash
curl -s http://localhost:3000/auth/me
```
Ответ: `{"statusCode":401,"message":"Unauthorized"}`

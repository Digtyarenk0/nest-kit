# START APP COMMAND

docker compose up --build

# NestJS Kit

A NestJS application template with pre-installed modules and configured architecture.

## Technologies

- **NestJS** - framework for building scalable server-side applications
- **TypeORM** - ORM for database operations
- **PostgreSQL** - main database
- **Redis** - for session storage and caching
- **JWT** - for authentication
- **Bull** - for queue management
- **Winston** - for logging
- **Class Validator** - for DTO validation
- **ConfigModule** - for configuration management
- **Swagger** - for API documentation

## Project Structure

```
src/
├── app/                    # Application modules
│   ├── auth/              # Authentication module
│   │   ├── controllers/   # Auth controllers
│   │   ├── services/      # Auth services
│   │   ├── dto/          # Auth DTOs
│   │   └── constants/    # Auth constants
│   ├── user/             # User module
│   │   ├── controllers/  # User controllers
│   │   ├── services/     # User services
│   │   └── dto/         # User DTOs
│   └── common/           # Common module
├── config/               # Configuration files
├── database/            # Database entities and migrations
└── main.ts             # Application entry point
```

## Architectural Approach

The project follows Domain-Driven Design (DDD) and SOLID principles:

### Core Principles
- Layer separation (domain, application, infrastructure)
- Dependency inversion
- Single responsibility
- Open/closed principle
- DRY (Don't Repeat Yourself)

### Module Structure
Each module follows the same structure:
- `controllers/` - HTTP request handlers
- `services/` - Business logic
- `dto/` - Data Transfer Objects
- `constants/` - Module-specific constants

## Installation and Setup

1. Install dependencies:
```bash
yarn install
```

2. Create database:
```bash
yarn db:create
```

3. Generate migrations:
```bash
yarn migration:generate src/migrations/InitialMigration
```

4. Run migrations:
```bash
yarn migration:run
```

5. Start the application:
```bash
# Development
yarn start:dev

# Production
yarn build
yarn start:prod
```

## Commands

### Migrations
- `yarn migration:generate src/migrations/[name]` - generate migration based on entity changes
- `yarn migration:create src/migrations/[name]` - create empty migration
- `yarn migration:run` - apply migrations
- `yarn migration:revert` - revert last migration

### Database
- `yarn db:create` - create database
- `yarn db:drop` - drop database

### Development
- `yarn start:dev` - start in development mode
- `yarn build` - build project
- `yarn start:prod` - start in production mode
- `yarn test` - run tests
- `yarn test:e2e` - run end-to-end tests

## Authentication

The project uses JWT authentication with two tokens:
- Access Token (15 minutes) - in response body
- Refresh Token (7 days) - in httpOnly cookie

### Endpoints
- `POST /auth/register` - user registration
- `POST /auth/login` - user login

## Logging

Configured Winston logger with file rotation and different log levels:
- error - errors
- warn - warnings
- info - information messages
- debug - debug information

## API Documentation

Swagger documentation is available at `/api` endpoint when running in development mode.

## Configuration

All settings are stored in `.env` file:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=kit_b

# JWT
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Logging
LOG_LEVEL=info
```

## Migration Process

1. First, ensure your database is created:
```bash
yarn db:create
```

2. Generate migration based on entity changes:
```bash
yarn migration:generate src/migrations/InitialMigration
```
This will create a new migration file in `src/database/migrations/` with SQL queries based on your entity changes.

3. Review the generated migration file to ensure it contains the correct SQL queries.

4. Apply the migration:
```bash
yarn migration:run
```
This will execute the SQL queries and update your database schema.

If you need to revert the last migration:
```bash
yarn migration:revert
```

## License

MIT

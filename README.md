# Next.js Application

A modern web application built with **Next.js and TypeScript**, following a modular architecture with reusable UI components, custom React hooks, centralized state management, automated testing, and Docker support.

Designed with maintainability, scalability, code consistency, and developer experience in mind.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Environment Configuration](#environment-configuration)
- [Production Build](#production-build)
- [Documentation](#documentation)

---

## 1. Getting Started

### Prerequisites

Ensure the following tools are installed before setting up the project:

- **Node.js** – Use a version compatible with the project configuration.
- **npm** – Package management.
- **Git** – Version control.
- **Docker & Docker Compose** – Required for containerized development.

### 1.1 Clone the Repository

```bash
git clone https://github.com/shahinsamiur/next_simple_template.git
cd next_simple_template
```

### 1.2 Initialize a New Repository

If you intend to use this project as an independent application, remove its existing Git history:

```bash
rm -rf .git
```

Initialize a new Git repository:

```bash
git init
git add .
git commit -m "chore: initial project setup"
```

### 1.3 Install Dependencies

Install the project dependencies:

```bash
npm install
```

### 1.4 Start the Development Server

```bash
npm run dev
```

The application will be available at:

**http://localhost:3000**

---

## 2. Available Scripts

The project provides npm scripts for common development and maintenance tasks.

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Generate an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Execute the automated test suite |

To execute a script:

```bash
npm run <script-name>
```

Refer to `package.json` for the complete list of configured scripts.

---

## 3. Project Structure

The project follows a modular directory structure that separates application responsibilities and encourages code reusability.

```text
src/
├── app/                  # Application routes and layouts
├── components/
│   ├── common/           # Shared application components
│   ├── layout/           # Header, footer, and layout components
│   └── ui/               # Reusable UI components
├── constants/            # Application-wide constants
├── hooks/                # Reusable custom React hooks
├── lib/                  # Third-party integrations and configurations
├── mocks/                # Mock data and development fixtures
├── state/
│   ├── context/          # React Context providers
│   └── redux/            # Redux Toolkit store and slices
├── styles/               # Global styles and design variables
├── test/                 # Unit and integration tests
├── types/                # Shared TypeScript definitions
├── utils/                # Reusable utility functions
└── validations/          # Validation schemas and rules
```

### Additional Directories

```text
.github/
└── workflows/            # GitHub Actions CI/CD workflows

docs/                     # Project documentation
public/                   # Static assets and public resources
```

For a detailed explanation of the architecture and directory responsibilities, see [Application Architecture](docs/APPLICATION_ARCHITECTURE.md).

---

## 4. Development Guidelines

All development should follow the established project architecture, coding conventions, and component reuse principles.

### Core Principles

- **Reusability:** Prefer existing components, hooks, and utilities over duplicated implementations.
- **Consistency:** Maintain consistent naming conventions, formatting, and coding patterns.
- **Type Safety:** Use TypeScript and avoid unnecessary use of `any`.
- **Maintainability:** Keep components and functions focused on specific responsibilities.
- **Design Consistency:** Use existing theme variables, design tokens, and shared UI components.
- **Code Quality:** Avoid unnecessary abstractions, dependencies, and unrelated refactoring.
- **Testing:** Add or update tests when introducing or modifying functionality.

For detailed guidelines, refer to:

- [Development Guide](docs/DEVELOPMENT.md)
- [AI Coding Instructions](docs/AI_CODING_INSTRUCTIONS.md)

---

## 5. Testing

The project uses **Vitest** for automated testing.

Execute the test suite:

```bash
npm run test
```

### Test Coverage Areas

The testing structure includes:

| Area | Description |
|---|---|
| Components | UI component behavior and rendering |
| Hooks | Custom React hook functionality |
| Integration | Interaction between application modules |
| Utilities | Shared helper functions |
| Validations | Schema validation and error handling |

### Test Configuration

The Vitest configuration is maintained in:

```text
vitest.config.mts
```

New functionality should include appropriate tests following the existing testing conventions.

---

## 6. Docker

The project includes Docker configurations for running the application in containerized environments.

### Development Environment

Start the development environment:

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Standard Environment

Start the standard Docker environment:

```bash
docker compose up --build
```

### Stop Containers

```bash
docker compose down
```

### Docker Configuration

| File | Description |
|---|---|
| `Dockerfile` | Defines the application image |
| `docker-compose.dev.yml` | Development environment configuration |
| `docker-compose.yml` | Standard container environment configuration |
| `.dockerignore` | Excludes unnecessary files from the Docker build context |

Refer to the respective configuration files for service definitions, ports, volumes, and environment settings.

---

## 7. CI/CD

The project uses **GitHub Actions** to automate integration and deployment workflows.

Workflow configurations are maintained in:

```text
.github/
└── workflows/
    ├── ci.yml
    └── cd.yml
```

| Workflow | Responsibility |
|---|---|
| `ci.yml` | Continuous Integration and automated validation |
| `cd.yml` | Continuous Deployment |

Refer to the workflow definitions for execution triggers, jobs, build steps, and deployment requirements.

---

## 8. Environment Configuration

Environment-specific configuration should be maintained using environment variables.

Create a local environment file:

```bash
touch .env.local
```

Add the required variables according to the application's configuration.

### Important

- Never commit `.env.local` or other files containing secrets.
- Do not expose private credentials in client-side code.
- Use the appropriate `NEXT_PUBLIC_` prefix only for variables intentionally exposed to the browser.
- Keep environment-specific configuration separate from application source code.

---

## 9. Production Build

Generate an optimized production build:

```bash
npm run build
```

After a successful build, start the production server:

```bash
npm run start
```

By default, the application runs at:

**http://localhost:3000**

---

## 10. Project Documentation

Technical documentation is maintained in the `docs/` directory.

| Document | Description |
|---|---|
| `APPLICATION_ARCHITECTURE.md` | Application architecture, directory structure, and responsibilities |
| `DEVELOPMENT.md` | Development setup, workflow, and coding practices |
| `AI_CODING_INSTRUCTIONS.md` | Guidelines and instructions for AI coding assistants |

Developers and AI coding assistants should review the relevant documentation before making significant changes.

---

## 11. License

Specify the applicable project license here.

---

**Built with Next.js and TypeScript.**
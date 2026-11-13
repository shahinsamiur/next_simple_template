# Development Guide

## 1. Introduction

This document explains how to set up, run, develop, test, and maintain the Next.js starter template.

It is intended for developers who want to work with the project locally or contribute new functionality.

## 2. Prerequisites

Before starting development, make sure the following tools are installed:

- Node.js (use a version compatible with the project)
- npm
- Git
- A code editor (VS Code recommended)
- Docker and Docker Compose (for containerized development)

Check the installed versions:

```bash
node -v
npm -v
git --version
docker --version
```

For the required Node.js version, check `package.json` and the project's configuration.

## 3. Project Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd next_simple_template
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs the dependencies defined in `package.json` and uses the project's lockfile.

### Step 3: Configure Environment Variables

If the application requires environment variables, create a local environment file:

```bash
touch .env.local
```

Add the required variables according to the project's environment configuration.

Never commit secrets, API keys, passwords, or other sensitive credentials.

### Step 4: Start Development Server

Check the available scripts in `package.json`.

For the standard Next.js development command:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 4. Development Workflow

Follow a consistent workflow when implementing new features or fixing existing issues.

### Step 1: Understand the Requirement

Before writing code:

- Understand the requested behavior.
- Identify the affected application modules.
- Check whether an existing component, hook, utility, or validation can be reused.
- Identify potential changes to shared state or application routing.

### Step 2: Create a Git Branch

Use descriptive branch names.

Examples:

```bash
git checkout -b feature/user-authentication
git checkout -b fix/header-responsive-issue
git checkout -b refactor/shared-hooks
```

### Step 3: Implement the Changes

Follow the project's architecture:

- Pages and routes: `src/app/`
- Shared components: `src/components/`
- Custom hooks: `src/hooks/`
- State management: `src/state/`
- Constants: `src/constants/`
- Shared utilities: `src/utils/`
- Validation: `src/validations/`
- Types: `src/types/`

Avoid putting unrelated responsibilities into a single file.

### Step 4: Write Tests

Add or update tests whenever functionality changes.

Examples of test locations:

```text
src/components/ui/Button.test.tsx
src/test/hooks/
src/test/integration/
src/test/validations/
```

Tests should cover:

- Expected behavior
- Edge cases
- Invalid inputs
- Error handling
- Integration between related modules

### Step 5: Verify Your Changes

Run the relevant checks using the scripts defined in `package.json`.

Typical commands may include:

```bash
npm run lint
npm run test
npm run build
```

These commands depend on the actual scripts configured in the project.

Resolve relevant errors before committing.

## 5. Component Development Guidelines

When creating a new component:

1. Keep it focused on one responsibility.
2. Use TypeScript for props and data structures.
3. Avoid unnecessary component-level complexity.
4. Use existing shared UI components where appropriate.
5. Keep styling consistent with the existing design system.
6. Handle loading, error, and empty states when applicable.
7. Add tests for important component behavior.

Example:

```tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

## 6. Custom Hook Development

Create a custom hook when reusable React stateful logic is needed.

Guidelines:

- Start hook names with `use`.
- Keep hooks focused on a specific responsibility.
- Follow React's Rules of Hooks.
- Handle cleanup when necessary.
- Add tests for expected behavior and edge cases.
- Export reusable hooks through `src/hooks/index.ts` when appropriate.

## 7. State Management Guidelines

Choose the appropriate state management approach based on the requirements.

| State type               | Recommended approach                              |
| ------------------------ | ------------------------------------------------- |
| Component-specific state | React `useState`                                  |
| Shared lightweight state | React Context                                     |
| Complex global state     | Redux Toolkit                                     |
| URL-based state          | Next.js routing and URL parameters                |
| Server-owned data        | Appropriate server-side or data-fetching approach |

Avoid introducing Redux or Context for state that can be managed locally.

## 8. Styling Guidelines

- Keep global styles inside `src/styles/globals.css`.
- Keep shared design variables inside `src/styles/variables.css`.
- Reuse existing design tokens.
- Avoid unnecessary global CSS rules.
- Maintain consistent responsive behavior.
- Avoid duplicating styles across reusable components.

## 9. TypeScript Guidelines

- Prefer explicit types for public component interfaces.
- Avoid unnecessary use of `any`.
- Reuse shared types when appropriate.
- Keep API response types separate from unrelated UI types.
- Use type-safe function parameters and return values.
- Avoid duplicating the same type definition across multiple modules.

## 10. Testing Guidelines

The project uses Vitest for automated testing.

Organize tests according to their responsibilities.

**Unit tests**

- Components
- Hooks
- Utilities
- Validation schemas

**Integration tests**

- Context providers
- Redux state management
- Interactions between related modules

Before submitting changes, ensure relevant tests pass.

## 11. Git Workflow

Use meaningful commit messages.

Examples:

```bash
git add .
git commit -m "feat: add user authentication"
git commit -m "fix: resolve header responsive issue"
git commit -m "test: add pagination hook tests"
git commit -m "refactor: improve shared button component"
```

Push your branch:

```bash
git push origin feature/user-authentication
```

Create a Pull Request with:

- A clear title
- Description of the changes
- Related issue (if applicable)
- Screenshots for UI changes
- Testing information

## 12. Docker Development

The project includes Docker configuration files.

- `Dockerfile` — Defines the application image.
- `docker-compose.yml` — Main Compose configuration.
- `docker-compose.dev.yml` — Development Compose configuration.

Inspect the Compose configuration before starting containers to understand the configured services, ports, volumes, and environment variables.

Typical commands:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop the services:

```bash
docker compose -f docker-compose.dev.yml down
```

## 13. CI/CD

GitHub Actions workflows are located inside:

```text
.github/workflows/
```

Current workflow files:

- `ci.yml` — Continuous Integration.
- `cd.yml` — Continuous Deployment.

Refer to the workflow definitions for the exact triggers, validation steps, build process, and deployment configuration.

## 14. Development Best Practices

- Follow the existing project structure.
- Write readable and maintainable code.
- Prefer reusable solutions over duplicated implementations.
- Keep components and hooks focused.
- Use meaningful variable and function names.
- Avoid unnecessary dependencies.
- Write tests for important functionality.
- Do not commit environment files or secrets.
- Verify builds before submitting changes.
- Keep documentation updated when introducing architectural changes.

## 15. Troubleshooting

### Dependency Installation Issues

Try checking the Node.js version and lockfile consistency.

```bash
node -v
npm install
```

### Development Server Issues

Check whether the configured development port is already in use.

### Build Errors

Run:

```bash
npm run build
```

Review TypeScript, Next.js, and build-related errors.

### Test Failures

Run the test script configured in `package.json` and inspect the failing test cases.

---

**Development principle:** Write code that is easy to understand, test, extend, and maintain. Follow the existing architecture and keep changes as small and focused as possible.

# Application Architecture

## 1. Overview

It follows a modular and organized architecture to keep the application maintainable, scalable, testable, and easy to extend.

The project separates responsibilities into dedicated directories for:

- Application routing and layouts
- Reusable UI components
- Shared hooks
- State management
- API and external integrations
- Constants and mock data
- Utility functions
- Form validation
- Type definitions
- Automated testing

The architecture aims to encourage code reusability, separation of concerns, and consistency across the application.

## 2. Technology Stack

| Technology    | Responsibility                           |
| ------------- | ---------------------------------------- |
| Next.js       | Application framework and routing        |
| React         | Component-based UI                       |
| TypeScript    | Static typing                            |
| CSS           | Application styling                      |
| Redux Toolkit | Global state management                  |
| React Context | Lightweight shared state                 |
| Vitest        | Unit and integration testing             |
| Docker        | Containerized development and deployment |

_Note: Refer to `package.json` for the exact installed package versions and dependencies._

## 3. Project Structure

The application source code lives inside `src/`. The project follows a feature-independent shared architecture, where common functionality is organized into dedicated directories.

### 3.1 Root Directory

| File / Directory         | Responsibility                              |
| ------------------------ | ------------------------------------------- |
| `.github/workflows/`     | CI and CD automation                        |
| `Dev_note/`              | Development and architectural documentation |
| `public/`                | Static assets accessible directly by URL    |
| `src/`                   | Main application source code                |
| `.dockerignore`          | Files excluded from Docker build context    |
| `.gitignore`             | Files excluded from Git                     |
| `Dockerfile`             | Docker image configuration                  |
| `docker-compose.yml`     | Docker Compose configuration                |
| `docker-compose.dev.yml` | Development Docker Compose configuration    |
| `next.config.ts`         | Next.js configuration                       |
| `tsconfig.json`          | TypeScript configuration                    |
| `vitest.config.mts`      | Vitest configuration                        |
| `eslint.config.mjs`      | ESLint configuration                        |
| `package.json`           | Dependencies and npm scripts                |

### 3.2 Application Layer — `src/app/`

Responsible for application routing, root layouts, and route-level composition.

| File         | Responsibility                               |
| ------------ | -------------------------------------------- |
| `layout.tsx` | Root application layout and shared providers |
| `page.tsx`   | Home page                                    |

**Guidelines:**

- Keep route-level composition inside the App Router.
- Keep reusable UI outside the route directory.
- Use layouts for shared application structures.
- Avoid placing unrelated business logic directly inside page components.

### 3.3 Components — `src/components/`

Contains reusable React components.

Components are divided into three categories.

**Common — `components/common/`**

Application-wide reusable components.

Example:

- `ContainerWrapper.tsx`

**Layout — `components/layout/`**

Components responsible for the application's overall visual structure.

Examples:

- `Header.tsx`
- `Footer.tsx`

**UI — `components/ui/`**

Small, reusable interface components.

Examples:

- `Button.tsx`
- `Input.tsx`

**Guidelines:**

- Components should have a clear responsibility.
- Prefer composition over unnecessary complexity.
- Keep components reusable when appropriate.
- Keep component-specific tests alongside the component when following the existing UI testing convention.

### 3.4 Constants — `src/constants/`

Contains application-wide constant values and static configuration data.

Example:

- `data.ts`

Use this directory for values that should not be recreated across multiple components.

### 3.5 Hooks — `src/hooks/`

Contains reusable custom React hooks.

Available hooks:

- `useClickOutside`
- `useDebounce`
- `useFetch`
- `useFormErrors`
- `useLocalStorage`
- `useMounted`
- `usePagination`
- `usePrevious`
- `useToggle`

`index.ts` provides a centralized export location.

**Guidelines:**

- A custom hook should encapsulate reusable React logic.
- Keep hooks independent of specific page implementations whenever possible.
- Avoid duplicating the same stateful logic across components.
- Add corresponding tests when introducing new hooks.

### 3.6 Libraries — `src/lib/`

Reserved for shared third-party integrations, library configurations, and infrastructure-related utilities.

Examples of potential responsibilities:

- API client configuration
- External service integrations
- Third-party library initialization

Keep integration-specific configuration here rather than spreading it throughout components.

### 3.7 Mocks — `src/mocks/`

Contains mock data used for development, testing, and UI previews.

Examples:

- `footer.ts`
- `nav.ts`

Mock data should remain separate from production data and API integration logic.

### 3.8 State Management — `src/state/`

The project provides two state management approaches.

**React Context — `src/state/context/`**

Used for lightweight shared state that can be accessed by multiple components.

Example:

- `CounterContext.tsx`

**Redux — `src/state/redux/`**

Used for centralized global state management.

Structure:

- `slices/` — Redux state slices.
- `store.ts` — Redux store configuration.

Example:

- `counterSlice.ts`

**StateProvider.tsx**

Provides the application-level state provider composition.

**Guidelines:**

- Use local component state for component-specific behavior.
- Use React Context for relatively simple shared state.
- Use Redux for more complex application-wide state.
- Avoid maintaining the same state independently in multiple state management systems.
- Keep state updates predictable and centralized where appropriate.

### 3.9 Styles — `src/styles/`

Contains global styling and shared design variables.

| File            | Responsibility            |
| --------------- | ------------------------- |
| `globals.css`   | Global application styles |
| `variables.css` | Shared CSS variables      |

Use shared variables for consistent colors, spacing, typography, and other design tokens.

### 3.10 Types — `src/types/`

Contains shared TypeScript type definitions.

Examples:

- `fetch.d.ts`
- `index.ts`

Keep reusable application-level types centralized when they are shared across multiple modules.

### 3.11 Utilities — `src/utils/`

Contains reusable helper functions that do not require React hooks or component lifecycle behavior.

Use this directory for generic, reusable operations.

### 3.12 Validations — `src/validations/`

Contains reusable validation schemas and related validation logic.

Example:

- `login.schema.ts`

Keep validation rules separate from UI components to make them reusable and testable.

## 4. Testing Architecture

Tests are organized inside `src/test/`, with additional component-level test files alongside UI components.

The test structure includes:

| Directory      | Purpose                                    |
| -------------- | ------------------------------------------ |
| `components/`  | Component tests                            |
| `hooks/`       | Custom hook tests                          |
| `integration/` | Integration tests for shared functionality |
| `layout/`      | Layout-related tests                       |
| `utils/`       | Utility function tests                     |
| `validations/` | Validation schema tests                    |
| `setup.ts`     | Shared test setup                          |

Examples:

- `CounterContext.test.tsx`
- `CounterRedux.test.tsx`
- `login.schema.test.ts`

**Testing principles:**

- Test observable behavior rather than implementation details.
- Cover important success and failure scenarios.
- Test reusable hooks independently.
- Use integration tests when multiple application modules work together.

## 5. Application Data Flow

A typical application interaction follows this conceptual flow:

1. The Next.js App Router resolves the requested route.
2. The page or layout composes the necessary components.
3. Components receive data through props or shared state.
4. Custom hooks encapsulate reusable stateful behavior.
5. Utility functions and validation schemas handle reusable operations.
6. API integrations are handled through the appropriate shared integration layer.
7. State updates are reflected in the relevant components.

## 6. Architectural Guidelines

When extending the application:

1. Keep responsibilities separated.
2. Prefer reusable components and hooks.
3. Avoid unnecessary abstractions.
4. Keep shared types and constants centralized.
5. Separate mock data from production data.
6. Keep validation logic independent of UI components.
7. Write tests for reusable functionality.
8. Follow the existing naming and export conventions.
9. Avoid unnecessary dependencies.
10. Keep the architecture simple until actual requirements justify additional complexity.

## 7. Adding New Features

When implementing a new feature, follow these general guidelines:

- Route-related implementation: `src/app/`
- Reusable UI: `src/components/`
- Shared React logic: `src/hooks/`
- Global state: `src/state/`
- Shared constants: `src/constants/`
- API integrations: `src/lib/`
- Mock data: `src/mocks/`
- Shared types: `src/types/`
- Helper functions: `src/utils/`
- Validation schemas: `src/validations/`
- Tests: `src/test/` or alongside the relevant component

For larger features, consider introducing a dedicated feature module when the complexity justifies it.

---

**Architecture principle:** Keep the application modular, predictable, reusable, and easy to maintain without introducing unnecessary complexity.

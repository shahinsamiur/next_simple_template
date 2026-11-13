# AI Coding Instructions

## 1. General Instructions

Before making any code changes, AI coding assistants must understand the project's existing architecture, development workflow, conventions, and documentation.

**Mandatory rules:**

1. Read all available project documentation before starting any development task.
2. Start with `README.md` and all documentation inside `docs/`.
3. Understand the existing project structure before creating or modifying files.
4. Inspect existing implementations before introducing new solutions.
5. Follow the established architecture and development conventions.
6. Never make assumptions about existing functionality without inspecting the relevant code.
7. Prefer simple, maintainable, and reusable solutions over unnecessary abstractions.
8. Do not make unrelated changes outside the requested scope.

## 2. Code Quality and Clean Code

- Write clean, readable, and maintainable code.
- Avoid unnecessary complexity and overengineering.
- Do not add unnecessary comments or explanations inside source code.
- Add comments only when they explain complex or non-obvious logic.
- Avoid duplicated code and repeated logic.
- Use meaningful and descriptive variable, function, and component names.
- Keep functions and components focused on a single responsibility.
- Avoid unnecessary nested conditions and deeply nested components.
- Do not leave unused variables, imports, functions, or dead code.
- Do not use `any` unless absolutely necessary and justified.
- Avoid unnecessary type assertions and type suppression.

## 3. UI and Component Reusability

**Always reuse existing UI components before creating new ones.**

This rule applies to:

- Buttons
- Inputs
- Textareas
- Select fields
- Modals
- Dialogs
- Cards
- Containers
- Loaders
- Dropdowns
- Other reusable interface elements

Instructions:

1. Inspect `src/components/ui/` before creating a new UI component.
2. Reuse existing components whenever their functionality meets the requirement.
3. If an existing component needs additional functionality, extend it without breaking existing implementations.
4. Do not create multiple components that serve essentially the same purpose.
5. If a genuinely new reusable component is required, place it in the appropriate directory.
6. Keep shared UI components generic and independent of specific pages whenever possible.
7. Avoid duplicating component styling and behavior.

## 4. Theme and Styling Rules

**Never introduce arbitrary hardcoded design values when an existing theme token is available.**

Follow these rules:

- Use theme colors and CSS variables for text colors, backgrounds, borders, and other visual elements.
- Do not introduce arbitrary hardcoded colors such as `#000000`, `#ffffff`, or custom RGB values when theme colors are available.
- Use the existing typography scale for font sizes.
- Follow the existing font family and font-weight conventions.
- Reuse existing spacing, border-radius, and shadow values.
- Avoid introducing new design tokens without a genuine requirement.
- Maintain visual consistency across all pages and components.
- Follow the existing responsive design conventions.
- Do not introduce a new styling library without explicit approval.

Before adding styles, inspect:

- `src/styles/globals.css`
- `src/styles/variables.css`
- Existing component styling patterns.

## 5. Project Structure and Architecture

Maintain the existing folder structure and architectural responsibilities.

Follow the established locations:

| Responsibility             | Directory          |
| -------------------------- | ------------------ |
| Pages and routing          | `src/app/`         |
| Shared components          | `src/components/`  |
| Custom hooks               | `src/hooks/`       |
| Constants                  | `src/constants/`   |
| Integrations and libraries | `src/lib/`         |
| Mock data                  | `src/mocks/`       |
| Global state               | `src/state/`       |
| Styles                     | `src/styles/`      |
| Tests                      | `src/test/`        |
| Type definitions           | `src/types/`       |
| Utility functions          | `src/utils/`       |
| Validation schemas         | `src/validations/` |

Rules:

1. Do not create new root-level directories without a valid architectural reason.
2. Do not place unrelated responsibilities inside existing directories.
3. Follow existing file naming and export conventions.
4. Keep related functionality organized.
5. Do not move or rename existing files unnecessarily.
6. For larger features, introduce additional structure only when justified by the feature's complexity.

## 6. Naming Conventions

Maintain one consistent naming style throughout the project.

Follow the existing conventions:

- React components: PascalCase.
- Custom hooks: camelCase with the `use` prefix.
- Functions: camelCase.
- Variables: camelCase.
- Constants: Follow the existing constant naming convention.
- TypeScript interfaces and types: PascalCase.
- Test files: Follow the existing `.test.ts` and `.test.tsx` conventions.
- File and directory names: Follow the established naming patterns.

Do not introduce a different naming convention when an existing convention is already established.

## 7. TypeScript and React Guidelines

- Use TypeScript for all new application code.
- Define clear and reusable component prop types.
- Prefer explicit and accurate types.
- Follow React's Rules of Hooks.
- Use functional components.
- Avoid unnecessary state management.
- Use local state for component-specific functionality.
- Use Context or Redux according to the existing state management architecture.
- Avoid duplicating state across different state management solutions.
- Handle loading, error, empty, and success states where applicable.
- Keep server and client components separated according to Next.js conventions.
- Add the `"use client"` directive only when client-side functionality is required.

## 8. State Management Guidelines

Choose the appropriate state management approach based on the requirement.

- Local component state: React `useState`.
- Lightweight shared state: React Context.
- Complex global state: Redux Toolkit.
- Reusable stateful logic: Custom hooks.
- Server-owned data: Use an appropriate server-side data-fetching approach.

Do not introduce additional state management libraries or duplicate existing state management functionality.

## 9. API and Data Handling

- Keep API integration logic separate from UI components.
- Reuse existing API clients and shared integrations.
- Follow existing request and response patterns.
- Use TypeScript types for API requests and responses.
- Handle API errors appropriately.
- Avoid duplicating API request logic.
- Never expose secret keys, credentials, or private environment variables in client-side code.
- Do not hardcode API URLs when an existing configuration or environment variable is available.

## 10. Testing Requirements

Whenever existing functionality is modified or new functionality is introduced:

1. Inspect existing tests and testing conventions.
2. Add or update relevant tests.
3. Test expected behavior and important edge cases.
4. Avoid changing tests simply to make incorrect implementation pass.
5. Run relevant tests after implementation.
6. Run linting and production build checks when applicable.

Use the existing Vitest configuration and testing utilities.

## 11. Dependency Management

- Reuse installed dependencies whenever possible.
- Do not install new packages for functionality that can reasonably be implemented using existing tools.
- Never add unnecessary dependencies.
- Do not upgrade or replace existing packages without explicit justification.
- Preserve the package manager and lockfile conventions.
- Explain why a new dependency is necessary before introducing it.

## 12. Git and Change Management

- Do not modify unrelated files.
- Do not overwrite existing functionality without understanding its purpose.
- Avoid unnecessary refactoring.
- Do not delete existing code unless it is genuinely obsolete or the requested task requires it.
- Do not modify CI/CD workflows, Docker configurations, or deployment settings unless the task requires it.
- Never commit secrets, credentials, or environment files.
- Do not create commits or push changes unless explicitly requested.
- After implementing any UI or feature, always suggest an appropriate Git commit message.
- The suggested commit message must briefly describe the actual changes.
- Follow conventional commit naming where appropriate, such as `feat:`, `fix:`, `refactor:`, `style:`, and `test:`.
- Never execute Git commit or push commands automatically.

## 13. Code Delivery and Communication

AI coding assistants must follow this response format when providing implementation guidance or code.

### Step 1: Understand and Explain

Before providing code:

- Understand the requirement.
- Inspect the existing implementation and related files.
- Identify reusable components and existing patterns.
- Briefly explain the proposed solution in a few sentences.
- Avoid lengthy explanations unless the task requires additional technical details.

### Step 2: Provide Code with File Paths

Always specify the exact file path before providing code.

For existing files:

- Mention that the file already exists.
- Identify what needs to be modified.
- Provide the relevant updated code or complete file when appropriate.

For new files:

- Explicitly mention that the file needs to be created.
- Provide the exact directory and filename.
- Provide the complete code for the new file.

Example:

**Create:** `src/components/common/SectionWrapper.tsx`

```tsx
// Implementation
```

**Modify:** `src/app/page.tsx`

```tsx
// Updated implementation
```

Never provide code without explaining where it belongs in the project.

### Step 3: Explain Important Details

After providing the code, briefly explain:

- What the implementation does.
- How it integrates with the existing application.
- Any important dependencies or configuration changes.
- Any additional steps required to make it work.

Avoid explaining obvious code line by line.

### Step 4: Verification

When implementation is complete:

- Identify the relevant tests or commands to run.
- Verify that the implementation follows the existing architecture.
- Mention any limitations or unresolved issues honestly.

### Step 5: Suggested Git Commit

Always provide a suggested commit message after completing an implementation.

Example:

```bash
git add src/components/common/SectionWrapper.tsx src/app/page.tsx
git commit -m "feat: add reusable section wrapper"
```

This is a suggestion only. Do not execute the commands unless explicitly requested by the user.

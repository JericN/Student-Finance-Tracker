# Student-Finance-Tracker

This is a course requirement for CS 191/192 Software Engineering Courses of the Department of Computer Science, College of Engineering, University of the Philippines, Diliman under the guidance of Ma. Rowena C. Solamo for A.Y. 2023-2024.

## Development Team

-   Jafri, Ali Mahmood
-   Javier, Timothy
-   Narte, Jeric
-   Santos, Vincent Marcel

## Using the Codebase

This project is built with [SvelteKit], [Node.js], and [PostgreSQL]. It utilizes [pnpm] as the package manager.

[Node.js]: https://nodejs.org/
[SvelteKit]: https://kit.svelte.dev/
[PostgreSQL]: https://www.postgresql.org/
[pnpm]: https://pnpm.io/

### Installation

Before running the project, make sure you have **Node.js**, **PostgreSQL**, and **pnpm** installed on your system.

```bash
# Install project dependencies.
pnpm install

# Sync auto-generated files from SvelteKit.
pnpm sync

# Start development server with live reloading and hot module replacement.
pnpm dev

# Compile production build with optimizations.
pnpm build

# Start production preview server.
pnpm preview
```

## Linting and Formatting

```bash
# Check code format issues
pnpm fmt

# Fix code format issues
pnpm fmt:fix

# Check all Lints
pnpm lint

# Check individual Lints
pnpm lint:html
pnpm lint:css
pnpm lint:js
pnpm lint:svelte


```

# Student-Finance-Tracker

This is a course requirement for CS 191/192 Software Engineering Courses of the Department of Computer Science, College of Engineering, University of the Philippines, Diliman under the guidance of Ma. Rowena C. Solamo for A.Y. 2023-2024.

## Development Team

-   Jafri, Ali Mahmood
-   Javier, Timothy
-   Narte, Jeric
-   Santos, Vincent Marcel

## The project

The **Student Finances Tracker** simplifies money management for students. It allows users to record transactions, updating their wallets accordingly. The app offers visual tools like graphs, reports, and calendars to track spending habits over time. With its user-friendly interface and powerful features, the Student Finances Tracker encourages students to stay organized and make informed financial decisions.

This project is built with [SvelteKit], [Node.js], and [PostgreSQL]. It utilizes [pnpm] as the package manager.
This can be both deployed as a webapp and a mobile application using [Capacitor.js].

[Node.js]: https://nodejs.org/
[SvelteKit]: https://kit.svelte.dev/
[PostgreSQL]: https://www.postgresql.org/
[pnpm]: https://pnpm.io/
[capacitor.js]: https://capacitorjs.com/

## Using the Codebase

Before running the project, make sure you have **Node.js**, **PostgreSQL**, **pnpm**, and [Android Studio] or [Xcode] installed on your system.

[Android Studio]: https://developer.android.com
[Xcode]: https://developer.apple.com/xcode/

### Web deployment

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
pnpm prev
```

### Mobile deployment

```bash
# build android package
pnpm build:android

# build ios package
pnpm build:ios

# open application in android studio
pnpm prev:android

# open application in xcode
pnpm prev:ios
```

### Linting and Formatting

```bash
# Check code format issues
pnpm fmt

# Fix code format issues
pnpm fmt:fix

# Check individual Lints
pnpm lint:html
pnpm lint:css
pnpm lint:js
pnpm lint:svelte

# Check all Lints and format
pnpm check
```

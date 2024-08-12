# Clean code challenge

This is a project targeted to improve or test your understanding of clean code.

## Explanation

In the `src/` folder you will find code that will act as a serializer.
It will transform data from a mock database and enrich some properties with
additional data just as a relational database would do.

### Example

```typescript
const SOURCE_DATA = {
  speakerId: 1
}

// Will be transformed into

const TARGET_DATA = {
  speaker: {
    name: "Some Name",
    topics: ["Some Topic"]
  }
}
```

---

## Task

Unfortunately the code in this project was programmed by a person
that never learned to write clean code, and it shows.

Your task: _Refactor the code_

Take your time and do some research if necessary. When you're ready to start
please create a new branch and start coding.

When you finished your task please push the branch with your solution
and create a merge request.

---

## Rules

- Code adheres to clean code guidelines
- Code adheres to
  polargold [TypeScript Guidelines](https://polargold.atlassian.net/wiki/external/MjdkMmQ5MGM1ZmVlNGFjMWJiNGFmZmVkYzM5ZTljNjY)
- The unit tests must run successfully
- `src/testData/index.ts` and `src/index.test.ts` must stay unaltered

---

## Prerequisites

### Node version manager

- See [NVM](https://github.com/nvm-sh/nvm#install--update-script) for installation

---

## Get started

### Node setup

```shell
# Install node packages
nvm use && npm install
```

---

## Useful commands

```shell
# Start nodemon
npm run dev
```

```shell
# Run code once
npm run app
```

```shell
# Run unit test
npm run test
```

---

---

_polargold GmbH, Kleine Johannisstraße 6, 20457 Hamburg_

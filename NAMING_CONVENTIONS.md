# Naming Conventions

## Files

> Baseline: https://angular.io/guide/styleguide#general-naming-guidelines. This document outlines additional conventions that apply to this specific project.

### Flat Tree

Keep the directory tree as flat as possible to reduce cognitive load which is increased by having to remember what is stored where.

### Why?

- Ensure quick navigation through the terminal or file explorer.
- Make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.
- Remove the need to think about where to put a file. Give it a type suffix and you're good to go.

### Type Suffixes

Do use conventional type names including `.service`, `.factory`, `.dto`, `.mutator`, and `.validator`. Invent additional type names if you must but take care not to create too many and always document them for easy reference.

#### Why?

- Type names provide a consistent way to quickly identify what is in the file.
- Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.
- Unabbreviated type names such as `.service` are descriptive and unambiguous. Abbreviations such as `.srv`, `.svc`, and `.serv` can be confusing.
- Type names provide pattern matching for any automated tasks.

## Code

> Baseline: https://github.com/kettanaito/naming-cheatsheet. This document outlines additional conventions that apply to this specific project.

### `fill(*)`

Methods that are named `fill` or using the `fill` prefix should only take a set of data and feed into something like a repository.

```ts
// Good
async fill(username: string): Promise<void> {
	this.#username = username;
}

// Bad
async fill(username: string): Promise<void> {
	const { code } = await http.get('/api/usernames/verify/', { username });

	if (code !== 200) {
		throw new Error("Invalid username");
	}

	this.#username = username;
}
```

### `restore(*)`

Methods that are named `restore` or using the `restore` prefix should only take existing data and perform **primarily** offline tasks with it. In a lot of cases this will rely on `fill` methods being called beforehand. _These kinds of methods should always throw an exception when there is an unexpected issue._

> There can be scenarios where you need to perform an online task for something like validation against a third-party API.

```ts
// Good
async restore(): Promise<void> {
	const { code } = await http.get('/api/usernames/verify', { username: this.#username });

	if (code !== 200) {
		throw new Error("Invalid username");
	}
}

// Bad
async restore(): Promise<void> {
	const { code } = await http.get('/api/usernames/verify', { username });

	if (code !== 200) {
		return;
	}
}
```

### `sync(*)`

Methods that are named `sync` or using the `sync` prefix should only take existing data and perform online tasks with it. In a lot of cases this will rely on `fill` and/or `restore` methods being called beforehand. _These kinds of methods should always throw an exception when there is an unexpected issue instead of swallowing it or setting data to `undefined`._

```ts
// Good
async sync(): Promise<void> {
	const { code, json } = await http.get(`/api/username/${this.#username}`);

	if (code !== 200) {
		throw new Error("Invalid response, please try again.");
	}

	this.#userData = json;
}

// Bad
async sync(): Promise<void> {
	const { json } = await http.get(`/api/username/${this.#username}`);

	this.#userData = json;
}
```

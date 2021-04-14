# Naming Conventions

Naming is hard so try to follow https://github.com/kettanaito/naming-cheatsheet as a baseline. This document outlines additional conventions that apply to this specific project.

## `fill(*)`

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

## `restore(*)`

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

## `sync(*)`

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

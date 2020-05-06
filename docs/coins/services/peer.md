# PeerService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<PeerService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

### Return Value

This method returns a promise that resolves with a `PeerService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## search

`search(options: Contracts.KeyValuePair): Promise<PeerResponse[]>`

Searches peers that match a given set of filters.

### Parameters

| Name                    | Type    | Description                                                        |
| ----------------------- | ------- | ------------------------------------------------------------------ |
| options                 | object  | The options to configure the behaviour of the method.              |
| options.retry           | number  | The number of retries if a request fails.                          |
| options.timeout         | number  | The number of milliseconds to wait before terminating the request. |
| options.filters         | object  | The object that contains the filters that should be applied.       |
| options.filters.version | string  | The version constraint that should be used to filter peers.        |
| options.filters.latency | latency | The maximum latency that should be used to filter peers.           |
| options.orderBy         | array   | The property and direction by which peers should be sorted.        |

### Return Value

This method returns a promise that resolves with an array with the following structure:

...

### Example

```ts
await peerService.search({ filters: { version: ">=2.5.0" } });
```

## searchWithPlugin

`searchWithPlugin(name: string, options: { additional?: string[] }): Promise<Peer[]>`

Searches peers that have a given plugin installed and enabled.

### Parameters

| Name               | Type     | Description                                           |
| ------------------ | -------- | ----------------------------------------------------- |
| options            | object   | The options to configure the behaviour of the method. |
| options.additional | string[] | The additional properties to store on each peer.      |

### Return Value

This method returns a promise that resolves with an array with the following structure:

...

### Example

```ts
await peerService.searchWithPlugin("core-wallet-api", { additional: ["version"] });
```

## searchWithoutEstimates

`searchWithoutEstimates(options: { additional?: string[] }): Promise<Peer[]>`

Searches peers that use exact counts for database entries.

### Parameters

| Name               | Type     | Description                                           |
| ------------------ | -------- | ----------------------------------------------------- |
| options            | object   | The options to configure the behaviour of the method. |
| options.additional | string[] | The additional properties to store on each peer.      |

### Return Value

This method returns a promise that resolves with an array with the following structure:

...

### Example

```ts
await peerService.searchWithoutEstimates({ additional: ["version"] });
```

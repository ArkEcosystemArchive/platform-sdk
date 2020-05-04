# PeerService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<PeerService>`

Create an instance of the service.

### Parameters

Name | Type | Description
---- | ---- | -----------
options | object | The options to configure the behaviour of the service.

### Return Value

This method returns a promise that resolves with a `PeerService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## findPeers

`findPeers(opts: any): Promise<PeerResponse[]>`

...

### Parameters

| | | Name | Type       | Description | | |
| | | ---- | ---------- | ----------- | | |
| | | XXXX | string | XXXXXXXXX   |   |   |

### Return Value

This method returns a promise that resolves with an array with the following structure:

...

### Example

```ts
...
```

## findPeersWithPlugin

`findPeersWithPlugin(name: string, opts: { additional?: string[] }): Promise<Peer[]>`

...

### Parameters

| | Name | Type     | Description | |
| | ---- | -------- | ----------- | |
| | XXXX | string | XXXXXXXXX   |   |

### Return Value

This method returns a promise that resolves with an array with the following structure:

...

### Example

```ts
...
```

## findPeersWithoutEstimates

`findPeersWithoutEstimates(opts: { additional?: string[] }): Promise<Peer[]>`

...

### Parameters

Name | Type | Description
---- | ---- | -----------
XXXX | string | XXXXXXXXX

### Return Value

This method returns a promise that resolves with an array with the following structure:

...

### Example

```ts
...
```

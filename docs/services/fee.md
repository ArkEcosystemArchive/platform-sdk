# FeeService

## construct

`construct(opts: Contracts.KeyValuePair): Promise<FeeService>`

Create an instance of the service.

### Parameters

| Name    | Type   | Description                                            |
| ------- | ------ | ------------------------------------------------------ |
| options | object | The options to configure the behaviour of the service. |

### Return Value

This method returns a promise that resolves with a `FeeService` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

## all

`all(days: number): Promise<Contracts.TransactionFees>`

Retrieves fees for common transaction types.

### Parameters

| Name | Type   | Description                                            |
| ---- | ------ | ------------------------------------------------------ |
| days | number | The number of days for which fees should be looked up. |

### Return Value

This method returns a promise that resolves with an object with the following structure:

```ts
{
	transfer: {
		static: '10000000',
		max: '10000000',
		min: '3627425',
		avg: '9878740'
	},
	secondSignature: {
		static: '500000000',
		max: 0,
		min: 0,
		avg: 0
	},
	delegateRegistration: {
		static: '2500000000',
		max: 0,
		min: 0,
		avg: 0
	},
	vote: {
		static: '100000000',
		max: '100000000',
		min: '1000000',
		avg: '52995956'
	},
	multiSignature: {
		static: '500000000',
		max: 0,
		min: 0,
		avg: 0
	},
	ipfs: {
		static: '500000000',
		max: '500000000',
		min: '10000000',
		avg: '62128036'
	},
	multiPayment: {
		static: '10000000',
		max: '10000000',
		min: '10000000',
		avg: '10000000'
	},
	delegateResignation: {
		static: '2500000000',
		max: 0,
		min: 0,
		avg: 0
	},
	htlcLock: {
		static: '10000000',
		max: '10000000',
		min: '10000000',
		avg: '10000000'
	},
	htlcClaim: {
		static: '0',
		max: 0,
		min: 0,
		avg: 0
	},
	htlcRefund: {
		static: '0',
		max: 0,
		min: 0,
		avg: 0
	}
}
```

### Example

```ts
await feeService.all(30);
```

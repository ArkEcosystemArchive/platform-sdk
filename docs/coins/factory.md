# Factory

## construct

`construct(opts: Contracts.FactoryOptions): Promise<Factory>`

Create an instance of the factory.

### Parameters

| Name            | Type   | Description                                               |
| --------------- | ------ | --------------------------------------------------------- |
| options         | object | The options to configure the behaviour of the factory.    |
| options.network | string | The name of the network that should be communicated with. |
| options.peer    | string | The peer that should be used for network communication.   |

### Return Value

This method returns a promise that resolves with a `Factory` value.

## destruct

`destruct(): Promise<void>`

Destroys the instance of the service.

### Parameters

This method has no parameters.

### Return Value

This method returns a promise that resolves with a void value.

# CoinFactory

## construct

`make(coin: CoinSpec, options: CoinOptions): Promise<Coin>`

Create an instance of a coin.

### Parameters

| Name            | Type   | Description                                                                  |
| --------------- | ------ | ---------------------------------------------------------------------------- |
| coin            | object | The specification of the coin, containing the manifest, schema and services. |
| options         | object | The options to configure the behaviour of the coin.                          |
| options.network | string | The name of the network that should be communicated with.                    |
| options.peer    | string | The peer that should be used for network communication.                      |

### Return Value

This method returns a promise that resolves with a `Coin` value.

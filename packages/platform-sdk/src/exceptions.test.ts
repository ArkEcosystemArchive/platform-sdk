import {
	NotImplemented,
	NotSupported,
	InvalidArguments,
	CryptoException,
} from "./exceptions"

test('NotImplemented', () => {
	expect(() => {
		throw new NotImplemented('klass', 'method');
	}).toThrow(`Method klass#method is not implemented.`);
});

test('NotSupported', () => {
	expect(() => {
		throw new NotSupported('klass', 'method');
	}).toThrow(`Method klass#method is not supported.`);
});

test('InvalidArguments', () => {
	expect(() => {
		throw new InvalidArguments('klass', 'method');
	}).toThrow(`Method klass#method does not accept the given arguments.`);
});

test('CryptoException', () => {
	expect(() => {
		throw new CryptoException(new Error('Boom'));
	}).toThrow('Boom');
});

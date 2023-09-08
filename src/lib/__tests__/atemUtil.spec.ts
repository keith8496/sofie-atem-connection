import { encodeRLE } from '../atemUtil'

describe('RLE', () => {
	test('no repetitions', () => {
		const source = `abababababababab\
cdcdcdcdcdcdcdcd\
abababababababab\
cdcdcdcdcdcdcdcd`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(source)
	})

	test('two repetitions', () => {
		const source = `abababababababab\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(source)
	})

	test('three repetitions', () => {
		const source = `abababababababab\
abababababababab\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(source)
	})

	test('four repetitions', () => {
		const source = `abababababababab\
abababababababab\
abababababababab\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const expectation = `fefefefefefefefe\
0000000000000004\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(expectation)
	})

	test('five repetitions at the beginning', () => {
		const source = `abababababababab\
abababababababab\
abababababababab\
abababababababab\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const expectation = `fefefefefefefefe\
0000000000000005\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(expectation)
	})

	test('five repetitions in the midddle', () => {
		const source = `2323232323232323\
abababababababab\
abababababababab\
abababababababab\
abababababababab\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const expectation = `2323232323232323\
fefefefefefefefe\
0000000000000005\
abababababababab\
cdcdcdcdcdcdcdcd\
0000000000000000\
1111111111111111`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(expectation)
	})

	test('five repetitions in the midddle #2', () => {
		const source = `2323232323232323\
abababababababab\
abababababababab\
abababababababab\
abababababababab\
abababababababab\
cdcdcdcdcdcdcdcd`
		const expectation = `2323232323232323\
fefefefefefefefe\
0000000000000005\
abababababababab\
cdcdcdcdcdcdcdcd`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(expectation)
	})

	test('five repetitions at the end', () => {
		const source = `2323232323232323\
abababababababab\
abababababababab\
abababababababab\
abababababababab\
abababababababab`
		const expectation = `2323232323232323\
fefefefefefefefe\
0000000000000005\
abababababababab`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(expectation)
	})

	test('only five repetitions', () => {
		const source = `abababababababab\
abababababababab\
abababababababab\
abababababababab\
abababababababab`
		const expectation = `fefefefefefefefe\
0000000000000005\
abababababababab`
		const encoded = encodeRLE(Buffer.from(source, 'hex'))
		expect(encoded.toString('hex')).toEqual(expectation)
	})
})

# Creditor Identifier
[![npm](https://img.shields.io/npm/v/creditor-id.svg?style=flat-square)](https://npmjs.com/creditor-id)
[![npm license](https://img.shields.io/npm/l/creditor-id.svg?style=flat-square)](https://npmjs.com/creditor-id)
[![npm downloads](https://img.shields.io/npm/dm/creditor-id.svg?style=flat-square)](https://npmjs.com/creditor-id)
[![build status](https://img.shields.io/travis/jhermsmeier/node-creditor-id.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-creditor-id)

## Install via [npm](https://npmjs.com)

```sh
$ npm install creditor-id
```

## Usage

```js
var CreditorId = require( 'creditor-id' )
```

```js
var cid = new CreditorId( 'DE98ZZZ09999999999' ) // OR
var cid = CreditorId.parse( 'DE98ZZZ09999999999' )
```

```js
CreditorId {
  countryCode: 'DE',
  checksum: '98',
  businessCode: 'ZZZ',
  nationalId: '09999999999'
}
```

```js
cid.toString() // > 'DE98ZZZ09999999999'
```

/**
 * CreditorId
 * @constructor
 * @param {String} country ISO Country Code
 * @param {String} checksum (Analog to IBAN (ISO 13616:2007))
 * @param {String} businessCode Creditor Business Code
 * @param {String} nationalId National Identification Number
 * @returns {CreditorId}
 */
function CreditorId( country, checksum, businessCode, nationalId ) {
  
  if( !(this instanceof CreditorId) )
    return new CreditorId( country, checksum, businessCode, nationalId )
  
  this.countryCode = ''
  this.checksum = ''
  this.businessCode = ''
  this.nationalId = ''
  
  this.set( country, checksum, businessCode, nationalId )
  
}

/**
 * Regular expression pattern to match
 * @type {RegExp}
 */
CreditorId.pattern = /^([a-z]{2})([0-9]{2})([A-Z0-9]{3})([A-Z0-9\+\?\/\-\:\(\)\.\,\']{11,28})$/i

/**
 * Parse a given value into a CreditorId
 * @param {String} value
 * @returns {CreditorId}
 */
CreditorId.parse = function( value ) {
  return new CreditorId( value )
}

/**
 * Determine whether a given value is a valid Creditor Id
 * @param  {String} value
 * @returns {Boolean}
 */
CreditorId.isValid = function( value ) {
  return CreditorId.pattern.test(
    value.replace( /^\s*|\s*$/g, '' )
  )
}

/**
 * CreditorId prototype
 * @type {Object}
 */
CreditorId.prototype = {
  
  constructor: CreditorId,
  
  /**
   * Set country, checksum, businessCode, nationalId
   * @param {String} country - country code
   * @param {String} [checksum] - checksum
   * @param {String} [businessCode] - business code
   * @param {String} [nationalId] - national ID code
   * @returns {CreditorId}
   */
  set: function( country, checksum, businessCode, nationalId ) {
    
    var argv = Array.prototype.filter.call( arguments, x => x != null )
    
    switch( argv.length ) {
      case 1:
        this.parse( argv[0] );
        break
      case 2:
        this.countryCode = argv[0]
        this.businessCode = 'ZZZ'
        this.nationalId = argv[1]
        this.checksum = this.getChecksum()
        break
      case 3:
        this.countryCode = argv[0]
        this.businessCode = argv[1]
        this.nationalId = argv[2]
        this.checksum = this.getChecksum()
        break
      case 4:
        this.countryCode = country || ''
        this.businessCode = businessCode || 'ZZZ'
        this.nationalId = nationalId || ''
        this.checksum = checksum || this.getChecksum()
        break
      default:
        throw new Error( 'Invalid number of arguments' )
    }
    
    return this
    
  },
  
  /**
   * Parse a CID from a given string
   * @param {String} value - input string
   * @returns {CreditorId}
   */
  parse: function( value ) {
    
    if( typeof value !== 'string' )
      throw new TypeError( 'Value must be a string' )
    
    if( value.length < 18 )
      throw new Error( 'Value too short' )
    
    if( value.length > 35 )
      throw new Error( 'Value too long' )
    
    value = value.toUpperCase()
    
    this.countryCode = value.substring( 0, 2 )
    this.checksum = value.substring( 2, 4 )
    this.businessCode = value.substring( 4, 7 )
    this.nationalId = value.substring( 7 )
    
    if( !/^[A-Z]{2}$/.test( this.countryCode ) )
      throw new Error( 'Invalid country code' )
    
    if( !/^[0-9]{2}$/.test( this.checksum ) )
      throw new Error( 'Invalid checksum' )
    
    if( !/^[A-Z0-9]{3}$/.test( this.businessCode ) )
      throw new Error( 'Invalid Creditor Business Code' )
    
    if( !/^[A-Z0-9\+\?\/\-\:\(\)\.\,\']{11,28}$/.test( this.nationalId ) )
      throw new Error( 'Invalid National Identification Number' )
    
  },
  
  /**
   * Calculate the checksum
   * @returns {String}
   */
  getChecksum: function() {
    var cidrev = this.nationalId + this.countryCode + '00'
    var mod = this._txtMod97(this._replaceChars(cidrev))
    return ('0' + (98 - mod)).substr(-2,2)
  },
  
  /**
   * Validate the checksum
   * @returns {Boolean}
   */
  check: function() {
    return this.getChecksum() == this.checksum
  },

  /**
   * mod97 function for large numbers
   *
   * @param {String} str - number as a string
   * @returns number mod 97
   */
  _txtMod97: function(str) {
    var res = 0
    for (var i = 0, l = str.length; i < l; ++i) {
      res = (res * 10 + parseInt(str[i], 10)) % 97
    }
    return res
  },

  /**
   * Replace letters with numbers using the SEPA scheme A=10, B=11, ...
   * Non-alphanumerical characters are dropped.
   *
   * @param {String} str - alphanumerical input string
   * @returns input string with letters replaced
  */
  _replaceChars: function(str) {
    var res = ''
    for (var i = 0, l = str.length; i < l; ++i) {
      var cc = str.charCodeAt(i)
      if (cc >= 65 && cc <= 90) {
        res += (cc - 55).toString()
      } else if (cc >= 97 && cc <= 122) {
        res += (cc - 87).toString()
      } else if (cc >= 48 && cc <= 57) {
        res += str[i]
      }
    }
    return res
  },

  /**
   * Convert the CID to a string
   * @returns {String} string representation of the CID
   */
  toString: function() {
    return this.countryCode +
      this.checksum +
      this.businessCode +
      this.nationalId
  },
  
}

// Exports
module.exports = CreditorId

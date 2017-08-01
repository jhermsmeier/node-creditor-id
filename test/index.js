var assert = require( 'assert' )
var CreditorId = require( '..' )

suite( 'Creditor Identifier', function() {
  
  // Test number with a correct checksum,
  // handed out by German National Bank
  var data = 'DE98ZZZ09999999999'
  var parsed = {
    countryCode: 'DE',
    checksum: '98',
    businessCode: 'ZZZ',
    nationalId: '09999999999'
  }
  
  suite( 'Instance', function() {
    
    test( 'constructor( string )', function() {
      var cd = new CreditorId( data )
    })
    
    test.skip( 'constructor( country, nationalId )', function() {
      var cd = new CreditorId( 'DE', '09999999999' )
      assert.deepEqual( cd, parsed )
    })
    
    test.skip( 'constructor( country, businessCode, nationalId )', function() {
      var cd = new CreditorId( 'DE', 'ZZZ', '09999999999' )
      assert.deepEqual( cd, parsed )
    })
    
    test( 'constructor( country, checksum, businessCode, nationalId )', function() {
      var cd = new CreditorId( 'DE', '98', 'ZZZ', '09999999999' )
      assert.deepEqual( cd, parsed )
    })

    test( 'getChecksum()', function() {
      var testCreditorId = new CreditorId( data )
      var checksum = testCreditorId.getChecksum()
      var expected = 98
      assert.equal( checksum, expected )
    })

    test( 'check()', function() {
      var testCreditorId = new CreditorId( data )
      assert.ok( testCreditorId.check() )
    })

  })
  
  test( 'parse( string )', function() {
    var cd = CreditorId.parse( data )
    assert.ok( cd )
    assert.ok( cd instanceof CreditorId )
  })
  
  test( 'toString()', function() {
    var cd = new CreditorId( data )
    var fmt = cd.toString()
    assert.equal( cd, fmt )
  })
  
})

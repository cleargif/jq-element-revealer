(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#jqElementRevealer', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.jqElementRevealer(), this.elems, 'should be chainable');
  });

  test('is jqElementRevealer', function() {
    expect(1);
    strictEqual(this.elems.jqElementRevealer().text(), 'jqElementRevealer0jqElementRevealer1jqElementRevealer2', 'should be jqElementRevealer');
  });

  module('jQuery.jqElementRevealer');

  test('is jqElementRevealer', function() {
    expect(2);
    strictEqual($.jqElementRevealer(), 'jqElementRevealer.', 'should be jqElementRevealer');
    strictEqual($.jqElementRevealer({punctuation: '!'}), 'jqElementRevealer!', 'should be thoroughly jqElementRevealer');
  });

  module(':jqElementRevealer selector', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is jqElementRevealer', function() {
    expect(1);
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':jqElementRevealer').get(), this.elems.last().get(), 'knows jqElementRevealer when it sees it');
  });

}(jQuery));

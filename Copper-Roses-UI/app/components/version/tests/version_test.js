'use strict';

describe('version module', function() {
  beforeEach(module('version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1.0');
    }));
  });
});

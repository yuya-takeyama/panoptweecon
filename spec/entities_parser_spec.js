var EntitiesParser = require('../lib/entities_parser');

describe('EntitiesParser', function () {
  var parser;

  beforeEach(function () {
    parser = new EntitiesParser;
  });

  describe('.parse()', function () {
    it('should parse expanded_url as array', function () {
      var result = parser.parse({
        'urls':[
          {"expanded_url":'http://example.com/'}
        ]
      });
      expect(result.urls).toEqual(['http://example.com/']);
    });

    it('should parse expanded_url uniquely', function () {
      var result = parser.parse({
        'urls':[
          {"expanded_url":'http://example.com/'},
          {"expanded_url":'http://example.com/'},
          {"expanded_url":'http://example.net/'}
        ]
      });
      expect(result.urls).toEqual([
        'http://example.com/',
        'http://example.net/',
      ]);
    });

    it('should return empty array if it has no URLs', function () {
      var result = parser.parse({'urls':[]});
      expect(result.urls).toEqual([]);
    });

    it('should parse hashtags as array', function () {
      var result = parser.parse({
        'hashtags': [
          {'text':'Foo'}
        ]
      });
      expect(result.hashtags).toEqual(['Foo']);
    });

    it('should parse hashtags uniquely', function () {
      var result = parser.parse({
        'hashtags': [
          {'text':'Foo'},
          {'text':'Foo'},
          {'text':'Bar'}
        ]
      });
      expect(result.hashtags).toEqual(['Foo', 'Bar']);
    });

    it('should return empty array if it has no hashtags', function () {
      var result = parser.parse({'hashtags': []});
      expect(result.hashtags).toEqual([]);
    });
  });
});

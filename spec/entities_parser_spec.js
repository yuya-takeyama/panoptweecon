var EntitiesParser = require('../lib/entities_parser');

describe('EntitiesParser', function () {
  var parser;

  beforeEach(function () {
    parser = new EntitiesParser;
  });

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
});

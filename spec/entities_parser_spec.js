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
});

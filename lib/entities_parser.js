var EntitiesParser = function () {
};

EntitiesParser.prototype = {
  parse: function (entities) {
    var urls = [];

    if (entities.urls) {
      urls = entities.urls.reduce(function (sum, url) {
        sum.push(url.expanded_url);
        return sum;
      }, []);
    }

    return {
      'urls':urls
    };
  }
};

module.exports = EntitiesParser;

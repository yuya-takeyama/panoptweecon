var EntitiesParser = function () {
};

EntitiesParser.prototype = {
  parse: function (entities) {
    var urls = [];

    if (entities.urls) {
      urls = entities.urls.reduce(function (sum, url) {
        if (sum.indexOf(url.expanded_url) === -1) {
          sum.push(url.expanded_url);
        }
        return sum;
      }, []);
    }

    return {
      'urls':urls
    };
  }
};

module.exports = EntitiesParser;

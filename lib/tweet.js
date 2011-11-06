var Tweet = function (data) {
  this.data = data;
};

Tweet.prototype.hasUrl = function () {
  return this.data.urls && this.data.urls.length > 0;
};

module.exports = Tweet;

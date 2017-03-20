/**
 * Created by rohansapre on 2/27/17.
 */

module.exports = function (app) {
    var userModel = require('./model/user/user.model.server');
    require("./services/user.service.server")(app, userModel);
    var websiteModel = require('./model/website/website.model.server');
    require("./services/website.service.server")(app, websiteModel);
    var pageModel = require('./model/page/page.model.server');
    require("./services/page.service.server")(app, pageModel);
    var widgetModel = require('./model/widget/widget.model.server');
    require("./services/widget.service.server")(app, widgetModel);
};
'use strict'


function templateMetadata(data, orgName, userId) {
    templateMetadata.prototype.template = {};
    var templatedata;
    if ((typeof data) === "string") {
        templatedata = Json.parse(data);
    } else {
        templatedata = data;
    }

    templateMetadata.prototype.template.title = templatedata.title;
    templateMetadata.prototype.template.body = templatedata.body;
    templateMetadata.prototype.template.template_id = templatedata.template_id;
    templateMetadata.prototype.template.userId = userId;
    templateMetadata.prototype.template.type = templatedata.type;
    templateMetadata.prototype.template.organization = orgName;
    templateMetadata.prototype.template.templateCreatedTimeStamp = templatedata.templateCreatedTimeStamp;
    templateMetadata.prototype.template.templateUpdatedTimeStamp = templatedata.templateUpdatedTimeStamp;
}

templateMetadata.prototype.getData = function() {
    return templateMetadata.prototype.template;
}

module.exports = templateMetadata;
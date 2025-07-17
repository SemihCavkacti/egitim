sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/yedas/mm/demo/model/Formatter"
],
function (Controller, MessageBox, MessageToast, Formatter,) {
    "use strict";

    return Controller.extend("com.yedas.mm.demo.controller.Detail", {
        formatter : Formatter,

        onInit: function () {
            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this._oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);

        },

        _onObjectMatched : function(oEvent){
            var argument = oEvent.getParameter("arguments");
            MessageBox.show("id : " + argument.id);
        }
    });
});
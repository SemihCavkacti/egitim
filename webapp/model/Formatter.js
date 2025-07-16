sap.ui.define(function(){
    "use strict";

    var Formatter = {

        getType : function(sValue){
            if(sValue != undefined){
                switch (sValue) {
                    case "PC":
                            return 4;
                        break;
                    case "Cable" :
                            return 6;
                }
            }
        },

        getStock : function(sValue){
            if(sValue != undefined){

                switch (sValue) {
                    case 0:
                         return "Stokta Yok"
                        break;
                    case 1:
                        return "Stokta"
                        break;
                }
            }
            else{
                return "";
            }
        },

        getStockState : function(sValue){
            if(sValue == 0){
                return "Error"
            }   
            else if(sValue == 1){
                return "Success"
            }

        },

        getCurrency : function(value, unit){
            return "" + value + " " + unit;
        }

    };

    return Formatter;
}, true);
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("com.yedas.mm.demo.controller.Main", {
        //İlk çalışacak fonksiyon
        onInit: function () {
        },
        //View içerisindeki tasarımların henüz tarayıcıda yüklenmediği an
        onBeforeRendering : function(){
        },

        //Tarayıcıda görsellerin yüklendikten sonra çalışan fonksiyon
        onAfterRendering : function(){
        },

        //Uygulamadan çıkış yapıldığında bu fonksiyona gelir.
        onExit : function(){
        },


        onAddPers : function(){
           var oInputName = this.getView().byId("input_PersName");
           var oInputSurname = this.getView().byId("input_PersSurName");
           var oText = this.getView().byId("txt_result");
           var sPersName = oInputName.getValue();
           var sPersSurName = oInputSurname.getValue();

           //oInput.setDescription(sPersName + " " + "personel ismi.");

           //MessageBox.show("Personel İsmi: " + sPersName);

           oText.setText(sPersName + sPersSurName);
        },

        onClear : function(){
            var oText = this.getView().byId("txt_result");
            oText.setText("");
        },

        /*
        onAddPers : function(){
            var oButton = this.getView().byId("id_Button");
            var message = "";
            var buttonType = oButton.getType();

            
            buttonType = oButton.setType("Reject");
            oButton.setText("Personel Sil");


            if(buttonType === "Accept"){
                message = "Personel Ekle";
            }
            else{
                message = "Personel Sil";
            }

            //MessageBox.show("Personel Ekleme !"); 
           
            MessageToast.show(message,{duration:3000, width: "30em"});
        }
        */

    });
});

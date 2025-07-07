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

            var data = {
                    name    : "Semih",
                    surName : "Çavkaçtı",
                    city    : "İstanbul"   
                }

            var oData = {
                        personel : [
                            {name : "Name1", surName : "SurName1", city : "İstanbul"},
                            {name : "Name2", surName : "SurName2", city : "Ankara"}
                        ]
            };

            
            var oModel = new sap.ui.model.json.JSONModel(data);
            this.getView().setModel(oModel, "mainModel");

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

        //Nesnelere  model ile erişim sağlandı.
        onAddPers : function(){
            var oModel = this.getView().getModel("mainModel");
            var name = oModel.getProperty("/name");
            var surName = oModel.getProperty("/surName");

            oModel.setProperty("/result", name + " " + surName);
        },

        //Nesneler Id ile erişim sağlandı.
        /* 
        onAddPers : function(){
           var oInputName = this.getView().byId("input_PersName");
           var oInputSurname = this.getView().byId("input_PersSurName");
           var oText = this.getView().byId("txt_result");
           var sPersName = oInputName.getValue();
           var sPersSurName = oInputSurname.getValue();

           oInput.setDescription(sPersName + " " + "personel ismi.");

           MessageBox.show("Personel İsmi: " + sPersName);

           oText.setText(sPersName + sPersSurName);
        },
        */
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

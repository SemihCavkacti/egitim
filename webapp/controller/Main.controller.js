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
                products : [
                        {id: "10001",   serialNumber : "111111" , type : "PC",   name : "Laptop", dimension : "30x30x3",  price : 1000, unit: "$"},
                        {id: "10002",   serialNumber : "111112", type : "PC",   name : "Mouse",  dimension : "10x5x3",   price : 48, unit: "$"},
                        {id: "10003",   serialNumber : "111113" , type : "PC",   name : "Keyboard", dimension: "30x20x5", price : 51, unit: "$"},
                        {id: "10004",   serialNumber : "111114" , type : "Cable", name : "HDMI",  dimension : "100x2x3",  price : 30, unit: "$"},
                        {id: "10005",   serialNumber : "111115", type : "Cable", name : "DP", dimension: "100x2x5",      price : 35, unit: "$"},
                        {id: "10006",   serialNumber : "111116" , type : "Cable", name : "DP", dimension: "100x2x5",      price : 35, unit: "$"}
                ],
                //count : 6
                criticalStockInfo : 'Information'
            }

            
            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "mainModel");

            var listCount = this.getView().getModel("mainModel").getProperty("/products").length;
 
            oModel.setProperty("/count", listCount);

            if(listCount > 5) {
                oModel.setProperty("/criticalStockInfo", "Information");
            }
            else if(listCount <= 5){
                oModel.setProperty("/criticalStockInfo", "Error");
            }

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

        //Tablodaki satıra tıklama fonksiyonu tetiklenir.
        onSelectProduct : function(oEvent){
             var oItem = oEvent.getParameter("listItem"); 
             var oContenxt = oItem.getBindingContext("mainModel");
             var data =  oContenxt.getObject();

             var string = "Tıkladığınız" +data.id + " id olan ürün" + data.name +" ürünüdür."

             MessageBox.show(string);
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

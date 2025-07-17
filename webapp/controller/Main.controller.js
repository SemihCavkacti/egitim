sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/yedas/mm/demo/model/Formatter",
    "sap/m/Dialog",
    "sap/m/ObjectIdentifier"
],
function (Controller, MessageBox, MessageToast, Formatter, Dialog, ObjectIdentifier) {
    "use strict";

    return Controller.extend("com.yedas.mm.demo.controller.Main", {
        formatter : Formatter,
        //İlk çalışacak fonksiyon
        onInit: function () {
            this.config();

            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);

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

        //İlk Yükleme anında dataların oluşturulması
        config : function(){
            var data = {
                    name    : "Semih",
                    surName : "Çavkaçtı",
                    city    : "İstanbul"   
            }

            var oData = {
                products : [
                        {id: "10001",   serialNumber : "111111" , type : "PC",   name : "Laptop", dimension : "30x30x3",  price : 1000, unit: "$", stock : 1},
                        {id: "10002",   serialNumber : "111112", type : "PC",   name : "Mouse",  dimension : "10x5x3",   price : 48, unit: "$", stock : 0},
                        {id: "10003",   serialNumber : "111113" , type : "PC",   name : "Keyboard", dimension: "30x20x5", price : 51, unit: "$", stock : 1},
                        {id: "10004",   serialNumber : "111114" , type : "Cable", name : "HDMI",  dimension : "100x2x3",  price : 30, unit: "$", stock : 0},
                        {id: "10005",   serialNumber : "111115", type : "Cable", name : "DP", dimension: "100x2x5",      price : 35, unit: "$", stock : 1},
                        {id: "10006",   serialNumber : "111116" , type : "Cable", name : "DP", dimension: "100x2x5",      price : 35, unit: "$", stock : 0}
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

        //Tablodaki satıra tıklama fonksiyonu tetiklenir.
        onSelectProduct : function(oEvent){
             var oItem = oEvent.getParameter("listItem"); 
             var oContenxt = oItem.getBindingContext("mainModel");
             var data =  oContenxt.getObject();

            this._oRouter.navTo("Detail",{id: data.id});
            

             //var string = "Tıkladığınız" +data.id + " id olan ürün" + data.name +" ürünüdür."

             //MessageBox.show(string);
        },

        onInputLiveChange : function(oEvent){
            var oInputParam = oEvent.getParameter("newValue");
            
            if(oInputParam === "$" || oInputParam === "&"){
                MessageToast.show("Özel karakter kullanmayınız!");
            }
        },

        //Nesnelere  model ile erişim sağlandı.
        onAddPers : function(type){
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
            var that = this;
            MessageBox.success("Form Temizlenecek. Emin misiniz ?", {
                title : "İşlem Türü",
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: function (sAction) {
					if(sAction == "OK") {
                        that.onClearForm();
                    }
                    else {
                        return;
                    }

				},
                dependentOn: this.getView()

            });

            //var oText = this.getView().byId("txt_result");
            //oText.setText("");
        },

        onClearForm : function(){
            var oModel = this.getView().getModel("mainModel");
                oModel.setProperty("/name" , "");
                oModel.setProperty("/surName" , "");
        },

        onPopup : function(){


            /*Dinamik olarak Dialog Nesnesi oluşturuldu.
            if (!this.oDefaultDialog) {
                this.oDefaultDialog = new Dialog({
                    title : "Dialog",
                    content : new ObjectIdentifier({title : "Dialog Title", text : "Dialog Text"}),
                    beginButton: new sap.m.Button({
						text: "OK",
						press: function () {
							this.oDefaultDialog.close();
						}.bind(this)
					}),
					endButton: new sap.m.Button({
						text: "Close",
						press: function () {
							this.oDefaultDialog.close();
						}.bind(this)
					})
                });

                this.getView().addDependent(this.oDefaultDialog);
            }

            
            this.oDefaultDialog.open();

            */
        },

        onDialogClose : function(oEvent){
            var oModel = this.getView().getModel("mainModel"); 
            var oItem = oEvent.getParameter("selectedItem");
            var oContext = oItem.getBindingContext("mainModel").getObject();

            oModel.setProperty("/productName", oContext.name);


        },

        handleValueHelpRequest : function(oEvent){
            if (!this.oDialog) {
                this.oDialog = sap.ui.xmlfragment("com.yedas.mm.demo.fragments.SHProductList", this);
                this.getView().addDependent(this.oDialog);
            }
            this.oDialog.open();
        },

        //IconTab Bar nesnesi eventi
        handleSelectIconTab : function(oEvent){
            var selectedKey = oEvent.getParameter("selectedKey");
            var oModel = this.getView().getModel("mainModel");
            var tableItems = oModel.getProperty("/products");


            switch (selectedKey) {
                case "info":
                    oModel.setProperty("/tableCount", tableItems.length);
                break;
                case "attachments":
                    oModel.setProperty("/AttachmentInfo", "Attachment Fragment");
                break;
                case "notes":
                    oModel.setProperty("/NoteInfo", "Note Fragment");
                break;
            }
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

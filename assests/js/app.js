/**
 * Base Client Class, contains all the base methods
 * @constructor
 * @version 0.0.1
 * @author Dimitris Kostaras
 */
var BaseClient = function () {
    var self = this;
    self.selectedClient = ko.observable();
    self.selectedNumbers = ko.observableArray();
    self.isSelected = ko.observable();
    self.numberToselect = ko.observable();
    self.singleColumnsNumbers = ko.observableArray();
    self.selectedColumns = ko.observableArray();
    self.numberToselect = ko.observable();
    self.maxSquares = ko.observable();
    self.maxNumber = ko.observable();
    self.maxColumns = ko.observable();
    self.columnPrice = ko.observable();
    self.currentSelected = function (that, item) {
        that.isSelected(item.numbers);
        if (self.selectedNumbers().length < self.numberToselect()) {
            if (self.selectedNumbers().indexOf(that.isSelected()) < 0) {
                self.selectedNumbers.push(that.isSelected());
            } else { alert("You have already choose this number"); }
        } else { alert("You cannot choose more than " + self.numberToselect() +" numbers");}
    }
    self.allNumbers =  ko.computed(function(){
        var arr = [];
        for (var i = 1; i <= self.maxSquares(); i++) {
            arr.push({numbers:i});
        }
        return arr;
    });
    self.clearAll = function (){ self.selectedNumbers([]);}
    self.maximumNumbers = ko.pureComputed(function(){
        return self.selectedNumbers().length > self.maxNumber();
    }, self);
    self.addColumn = function() {
        self.singleColumnsNumbers(self.selectedNumbers().slice(0));
        if (self.selectedColumns().length < self.maxColumns()) {
            self.selectedColumns.push({column: self.singleColumnsNumbers()});
            self.selectedNumbers([]);
        }else {
            alert("You cannot add more than "+ self.maxColumns() + " columns");
        }
    }.bind(self);
    self.removeColumn = function(column) { self.selectedColumns.remove(column); }
    self.totalPrice = ko.pureComputed(function() {
        var total = 0;
        for( var i = 0; i < self.selectedColumns().length; i++){
            total+= self.columnPrice();
        }
        return total;
    },self);
    self.formatCurrency = function(value) {
        return  value.toFixed(2) + "€";
    }
};
/**
 * Lotto Client inherits from the Base Class
 * @constructor
 * @author Dimitris Kostaras
 */
var LottoClient = function () {
    var self = this;
    BaseClient.apply(self);
    self.numberToselect(6);
    self.maxSquares(49);
    self.maxNumber(5);
    self.maxColumns(10);
    self.columnPrice(0.50);
};
/**
 * Kenno Client inherits from the Base Class
 * @constructor
 * @author Dimitris Kostaras
 */
var KenoClient = function () {
    var self = this;
    BaseClient.apply(self);
    self.numberToselect(7);
    self.maxSquares(30);
    self.maxNumber(6);
    self.maxColumns(6);
    self.columnPrice(0.30);
};

var SelectionView = function(){
    var self = this;
    self.availableClients = ko.observableArray(["Lotto", "Keno"]);
    self.selectedClient = ko.observable();
};

var models = {
    view: new SelectionView(),
    lotto: new LottoClient(),
    keno: new KenoClient()
};

ko.applyBindings(models);
/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["depot.OrderHistoryController"]){dojo._hasResource["depot.OrderHistoryController"]=true;dojo.provide("depot.OrderHistoryController");dojo.require("dojox.grid.DataGrid");dojo.require("dojo.data.ItemFileReadStore");dojo.require("dojox.dtl");dojo.require("dojox.dtl.Context");dojo.declare("depot.OrderHistoryController",null,{format:null,orderStore:null,template:null,constructor:function(){this.format={id:"orderId",items:[]};this.orderStore=new dojo.data.ItemFileReadStore({data:this.format,clearOnClose:true});dojo.connect(dijit.byId("orderHistory"),"onLoad",this,this.getOrders);dojo.subscribe("orderHistory-select",this,this.getOrders);},getOrders:function(){console.debug("Getting Orders");var _1={url:"/CustomerOrderServicesWeb/jaxrs/Customer/Orders",handleAs:"json",load:dojo.hitch(this,this.loadOrdersSuccess),error:dojo.hitch(this,this.loadOrdersError)};return dojo.xhrGet(_1);},loadOrdersSuccess:function(_2){console.debug("Order History",_2);this.format.items=_2;this.orderStore.data=this.format;this.orderStore.close();console.debug(dijit.byId("orderHistoryGrid"));dijit.byId("orderHistoryGrid").setStore(this.orderStore);},loadOrdersError:function(_3){console.error(_3);},formatStatus:function(_4){console.debug("format status",_4);return (_4&&_4=="OPEN")?"Current Order":_4;},getLineItems:function(i,_5){console.debug("getLineItem,",_5);var li=[];if(_5){dojo.forEach(_5.lineitems,function(_6,i){console.debug(_6,i);li[i]=_6;});}console.debug("li",li);return li;},formatLineItems:function(_7){console.debug("format",_7);if(_7){if(!this.template){this.template=new dojox.dtl.Template(dojo.moduleUrl("orderHistory","orderHistoryTemplate.html"));}var _8=new dojox.dtl.Context({lis:_7});var _9=this.template.render(_8);return _9;}}});}
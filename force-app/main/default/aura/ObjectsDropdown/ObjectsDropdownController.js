({
    init: function(component, event, helper) {
        var action = component.get("c.getObjectName"); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var allValues = response.getReturnValue();
                component.set("v.options", allValues);
            }                    
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
        
    },
    onChange : function(component, event, helper) {
        var a = component.get('c.captureObjectField');
        $A.enqueueAction(a);
    },
    captureObjectField: function (component,event,helper) {
        var objFields = component.get("c.getObjectField");
        var obj = component.find('onjId').get('v.value');
        
        objFields.setParams({"objectName": obj});
        objFields.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var allValues = response.getReturnValue();
                var selectedOptions=[];
                console.log(allValues);
                component.set("v.getField", allValues);
                allValues.forEach(function(item){
                    selectedOptions.push({value:item, label:item});
                }, this);
                component.set("v.getFieldObject",selectedOptions);
                component.set("v.ObjectName",obj);
                component.set("v.getFieldObjectList",[]);
                component.set("v.query","");
            }                    
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(objFields);     
    }       ,            
    onFieldChange : function(component, event, helper) {
        var a = component.get('c.captureObjectRecord');
        $A.enqueueAction(a);
    },
    captureObjectRecord: function (component,event,helper) {
        var objRecord = component.get("c.getObjectRecords");
       
        var ob = component.find('onjId').get('v.value');
        var fld = component.find('fieldSelectBox').get('v.value');
        var que = "Select ";
        fld.forEach(function(item){
                    que+=item + " ";
                }, this);
        que = que + 'From ' + ob;
        
        objRecord.setParams({"objectName": ob});
        objRecord.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var allValues = response.getReturnValue();
                console.log(allValues);
                component.set("v.records", allValues);
                component.set("v.query",que);
            }                    
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(objRecord);     
    }
    
    })
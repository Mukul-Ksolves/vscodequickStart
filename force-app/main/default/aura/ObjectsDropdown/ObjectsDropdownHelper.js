({

    captureObjectField: function (component,event,helper) {
        var objName = component.get("c.getObjectField");//get apex method for field names
        var av = component.find('onjId').get('v.value');
        console.log(av);
        action.setParams({"objectName": av});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var allValues = response.getReturnValue();
                console.log(allValues);
                component.set("v.getField", allValues);
                
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
    }                   
})
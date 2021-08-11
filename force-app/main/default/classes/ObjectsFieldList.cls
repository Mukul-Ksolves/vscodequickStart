public with sharing class ObjectsFieldList {
    @AuraEnabled
	public static List<String> getObjectName(){
    	List<String> objects=new List<String>();
    	List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();  
    	for(SObjectType sot:gd){
        	objects.add(sot.getDescribe().getName());
        	objects.sort();  
    	}
    	return objects;
	}
	@AuraEnabled
	public static List<String> getObjectField(string objectName){
    	Map <String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
    	List<string> fieldsNames = new list<string>();
    
    	Map <String, Schema.SObjectField> fieldMap = 
 		schemaMap.get(objectName).getDescribe().fields.getMap();
    	for(Schema.SObjectField sfield : fieldMap.Values())
    	{
        	schema.describefieldresult dfield = sfield.getDescribe();
        	fieldsNames.add(dfield.getName());
        
    	}
    	return fieldsNames;
 	}
    	@AuraEnabled
	public static List<Sobject> getObjectRecords(String objectName){
    	String q = 'Select Id From ' + objectName;
    	List<Sobject> records = Database.query(q);
    	return records;
 	}
}
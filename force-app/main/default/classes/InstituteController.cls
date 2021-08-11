public with sharing class InstituteController {
    public InstituteController() {

    }
    public Id selectedInsId{get;set;} 
    public Id selectedMenId{get;set;}
    public Id currentMenId{get;set;}
   public List<Mentor__c> menlist {get;set;}   
   public List<Student__c> stulist {get;set;} 
   public Boolean renderPBtable {get;set;}
   public Boolean renderSTtable {get;set;}
   public Boolean noContact {get;set;}
   
   public List<SelectOption> getInstituteNames() {
       List<SelectOption> insOptions= new List<SelectOption>();
       system.debug(selectedInsId);
       insOptions.add( new SelectOption('','Institutes'));
       for(Institute__c ins : [select Id,Name from Institute__c ] ) {
           insOptions.add(new SelectOption(ins.Id,ins.Name));
       }
       return insOptions;
   }

   public Pagereference showMentors(){
       menlist=[select name,Designation__c,Id from Mentor__c where InstituteId__c=: selectedInsId];
       
       if(menlist.size() > 0)
       {
           renderPBtable = true; 
           noContact = false;
           renderSTtable = false;
       }
       else
       {
           renderPBtable = false;
           noContact = true;
           renderSTtable = false;
       }
         return null;
   }

   public Pagereference showStudents(){
    stulist=[select name,City__c,Class__c,State__c,MentorId__c from Student__c where MentorId__c=: selectedMenId];
    if(stulist.size() > 0)
       {
           renderSTtable = true; 
       }
       else
       {
           renderSTtable = false;
       }
      return null;
}
}

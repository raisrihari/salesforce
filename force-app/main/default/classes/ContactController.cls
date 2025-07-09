public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        try {
            return [
                SELECT Id, Name, Email, Phone, Department__c, CreatedDate
                FROM Contact
                ORDER BY CreatedDate DESC
                LIMIT 100
            ];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving contacts: ' + e.getMessage());
        }
    }
    
    @AuraEnabled
    public static Contact saveContact(Contact contact) {
        try {
            upsert contact;
            return contact;
        } catch (Exception e) {
            throw new AuraHandledException('Error saving contact: ' + e.getMessage());
        }
    }
    
    @AuraEnabled
    public static void deleteContact(Id contactId) {
        try {
            delete [SELECT Id FROM Contact WHERE Id = :contactId];
        } catch (Exception e) {
            throw new AuraHandledException('Error deleting contact: ' + e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchTerm) {
        try {
            String searchKey = '%' + searchTerm + '%';
            return [
                SELECT Id, Name, Email, Phone, Department__c, CreatedDate
                FROM Contact
                WHERE Name LIKE :searchKey
                   OR Email LIKE :searchKey
                   OR Phone LIKE :searchKey
                ORDER BY CreatedDate DESC
                LIMIT 50
            ];
        } catch (Exception e) {
            throw new AuraHandledException('Error searching contacts: ' + e.getMessage());
        }
    }
}
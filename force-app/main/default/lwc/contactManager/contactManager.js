import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import searchContacts from '@salesforce/apex/ContactController.searchContacts';
import deleteContact from '@salesforce/apex/ContactController.deleteContact';

export default class ContactManager extends LightningElement {
    @track contacts = [];
    @track filteredContacts = [];
    @track searchTerm = '';
    @track showContactForm = false;
    @track selectedContact = null;
    @track isLoading = false;
    
    wiredContactsResult;

    @wire(getContacts)
    wiredContacts(result) {
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = result.data;
            this.filteredContacts = [...this.contacts];
            this.isLoading = false;
        } else if (result.error) {
            this.showToast('Error', 'Failed to load contacts', 'error');
            this.isLoading = false;
        }
    }

    get totalContacts() {
        return this.contacts.length;
    }

    get showEmptyState() {
        return !this.isLoading && this.filteredContacts.length === 0;
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
        this.performSearch();
    }

    async performSearch() {
        if (this.searchTerm.length >= 2) {
            this.isLoading = true;
            try {
                const result = await searchContacts({ searchTerm: this.searchTerm });
                this.filteredContacts = result;
            } catch (error) {
                this.showToast('Error', 'Search failed', 'error');
            } finally {
                this.isLoading = false;
            }
        } else if (this.searchTerm.length === 0) {
            this.filteredContacts = [...this.contacts];
        }
    }

    handleAddContact() {
        this.selectedContact = null;
        this.showContactForm = true;
    }

    handleEditContact(event) {
        this.selectedContact = event.detail.contact;
        this.showContactForm = true;
    }

    handleCloseForm() {
        this.showContactForm = false;
        this.selectedContact = null;
    }

    async handleSaveContact(event) {
        this.showContactForm = false;
        this.isLoading = true;
        
        try {
            await refreshApex(this.wiredContactsResult);
            this.showToast('Success', 'Contact saved successfully', 'success');
        } catch (error) {
            this.showToast('Error', 'Failed to refresh contacts', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    async handleDeleteContact(event) {
        const contactId = event.detail.contactId;
        this.isLoading = true;
        
        try {
            await deleteContact({ contactId });
            await refreshApex(this.wiredContactsResult);
            this.showToast('Success', 'Contact deleted successfully', 'success');
        } catch (error) {
            this.showToast('Error', 'Failed to delete contact', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }
}
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactForm extends LightningElement {
    @api contact;
    @track isSaving = false;

    get recordId() {
        return this.contact ? this.contact.Id : null;
    }

    get modalTitle() {
        return this.contact ? 'Edit Contact' : 'New Contact';
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSuccess(event) {
        this.isSaving = false;
        
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Contact saved successfully',
            variant: 'success'
        });
        this.dispatchEvent(evt);
        
        this.dispatchEvent(new CustomEvent('save', {
            detail: { recordId: event.detail.id }
        }));
    }

    handleError(event) {
        this.isSaving = false;
        
        const evt = new ShowToastEvent({
            title: 'Error',
            message: 'Failed to save contact',
            variant: 'error'
        });
        this.dispatchEvent(evt);
    }

    handleSubmit() {
        this.isSaving = true;
    }
}
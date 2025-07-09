import { LightningElement, api } from 'lwc';

export default class ContactCard extends LightningElement {
    @api contact;

    get formattedDate() {
        if (this.contact && this.contact.CreatedDate) {
            return new Date(this.contact.CreatedDate).toLocaleDateString();
        }
        return '';
    }

    handleEdit() {
        this.dispatchEvent(new CustomEvent('edit', {
            detail: { contact: this.contact }
        }));
    }

    handleDelete() {
        if (confirm('Are you sure you want to delete this contact?')) {
            this.dispatchEvent(new CustomEvent('delete', {
                detail: { contactId: this.contact.Id }
            }));
        }
    }
}
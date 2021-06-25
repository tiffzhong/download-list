import Component from '@ember/component';
import { computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { isEmpty, isPresent } from '@ember/utils';

export default Component.extend({
    classNames: ['toolbar__container'],
    files: null,

    allSelected: computed('selectedFiles', 'totalFiles', function() {
        return this.selectedFiles.length === this.totalFiles;
    }),

    availableAndSelectedFiles: computed('selectedFiles', function(){
        console.log(this.selectedFiles,'this.selectedFiles');
        return this.selectedFiles.filter(files => files.status === 'Available')
    }),

    checkboxCounter: computed('selectedFiles', function() {
        if(isEmpty(this.selectedFiles)) {
            return 'None selected';
        } else {
            return `Selected ${this.selectedFiles.length}`;
        }
    }),

    selectedFiles: filterBy('files', 'isSelected'),

    someSelected: computed('selectedFiles', function() {
        return this.selectedFiles.length >= 1 && this.selectedFiles.length < this.totalFiles;
    }),

    totalFiles: computed('files', function() {
        return this.files.length;
    }),
    
    deselectAllFiles(){
        (this.files || []).forEach(file => file.set('isSelected', false)
    )},

    selectAllFiles(){
        (this.files || []).forEach(file => file.set('isSelected', true)
    )},

    actions: {
        download() {
            // Only files that are selected and are in "available" status can be DL'd
            if (isPresent(this.availableAndSelectedFiles)) {
                let alertText = '';
                this.availableAndSelectedFiles.forEach(file => {
                    alertText += `Downloading \n Path: ${file.get('path')} \n Device: ${file.get('device')}`
                })
                alert(alertText);
            } else {
                alert('You must select Status: Available files to begin a download')
            }
        },

        selectAll() {
            if(this.allSelected) {
                this.deselectAllFiles();
            } else {
                this.selectAllFiles();
            }
        }
    }
});

import Component from '@ember/component';
import { computed } from '@ember/object';
import { filterBy, filter } from '@ember/object/computed';
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

    checkboxCount: computed('selectedFiles', function() {
        if(isEmpty(this.selectedFiles)) {
            return 'None selected';
        } else {
            return `Selected ${this.selectedFiles.length}`;
        }
    }),

    selectedFiles: filterBy('files', 'isSelected'),

    totalFiles: computed('files', function() {
        return this.files.length;
    }),
    
    // checkboxState: computed('selectedFiles', function() {
    //     const checkbox = document.getElementsByClassName('checkbox-select-all');
 
    //     if (this.selectedFiles.length < 4) {
    //         return checkbox.indeterminate = true;
    //     } else {
    //         return checkbox.indeterminate = false;
 
    //     }
    // }),

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

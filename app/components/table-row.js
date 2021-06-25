import Component from '@ember/component';
import { equal } from '@ember/object/computed';

export default Component.extend({
    classNames: ['table-row'],
    tagName: 'tr',
    
    availableStatus: equal('file.status', 'Available'),

    actions: {
        selectFile(file) {
            file.set('isSelected', !file.get('isSelected'));
        }
    }
});

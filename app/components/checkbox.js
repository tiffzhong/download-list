import Component from '@ember/component';
import { reads } from '@ember/object/computed';

export default Component.extend({
	isChecked: reads('files.isSelected'),
});

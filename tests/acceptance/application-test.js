import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

// To get data-elements
function de(id) {
	return `[data-element='${id}']`;
}

module('Acceptance | application', function(hooks) {
	setupApplicationTest(hooks);

	test('Can click select all or individual checkboxs', async function (assert) {
		await visit('/');
		await click(`#toolbar-checkbox input`);
		assert.dom(`${de('checkbox-2')} input`).isChecked('Individual checkbox is checked');
		assert.dom(`${de('checkbox-4')} input`).isChecked('Individual checkbox is checked');
		assert.dom(`#toolbar-checkbox input`).isChecked('Select all checkbox is checked');
		assert.dom(de('counter')).hasText('Selected 5', 'All items in table are checked');

		// Deselect individually
		await click(`${de('checkbox-0')} input`);
		assert.dom(`#toolbar-checkbox input`).isNotChecked('Select all checkbox is not checked');
		await click(`${de('checkbox-1')} input`);
		assert.dom('.checkbox-indeterminate').exists('Indeterminate checkbox exists when 1 or more (but less than total files) items are selected');
		await click(`${de('checkbox-2')} input`);
		await click(`${de('checkbox-3')} input`);
		await click(`${de('checkbox-4')} input`);
		assert.dom(de('counter')).hasText('None selected', 'Counter states None selected');
	});

	test('Can download only available files', async function (assert) {
		await visit('/');
		assert.dom(de('status-row-0')).hasText('Scheduled', 'First letter of Status text is capitalized')
		assert.dom(de('status-row-2')).hasText('Available', 'First letter of Status text is capitalized')
		assert.dom(`${de('status-row-2')} .available-green`).exists(`Green dot exists next to 'Available' items`)

		await click(`${de('checkbox-0')} input`); // Scheduled
		assert.dom('.checkbox-indeterminate').exists('Indeterminate checkbox exists when 1 item is selected');
		await click(`${de('checkbox-1')} input`); // Available 
		await click(`${de('checkbox-3')} input`); // Scheduled
		assert.dom(de('counter')).hasText('Selected 3');
		assert.dom('.toolbar__button').exists('Download Selected button exists')
		// await click('.toolbar__button');

		// Cannot test alart due to Testem error 
		// Uncaught Error: [Testem] Calling window.alert() in tests is disabled, because it causes testem to fail with browser disconnect error.
		// Would potentially move to a unit test for this alert
	});
});

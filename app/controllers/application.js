import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import { capitalize } from '@ember/string';

export default Controller.extend({
    allFiles: computed(() => [
        { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
        { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
        { name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
        { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
        { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' }
    ]),

    filesWithSelect: computed('allFiles', function() {
        return (this.allFiles || []).map(files => ObjectProxy.create({
            name: files.name,
            device: files.device,
            path: files.path,
            status: capitalize(files.status),
            isSelected: false,
        }))
    })
});
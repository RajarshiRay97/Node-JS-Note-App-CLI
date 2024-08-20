// to import npm packages (third party modules)
const yargs = require('yargs');

// to import our own custom module
const notes = require('./notes.js');

// to update the version of node js application
yargs.version('1.1.0');

// commands in notes app - add, remove, read, list
// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove the targeted note',
    builder: {
        title: {
            describe: 'Title of the Note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List down all the existing notes',
    handler(){
        notes.listNotes();
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read the targeted note',
    builder: {
        title: {
            describe: 'Title of the Note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

// return the argv object
yargs.parse();
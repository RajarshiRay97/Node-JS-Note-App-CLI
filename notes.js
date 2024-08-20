const fs = require('fs');
const chalk = require('chalk');


// to add a given note
const addNote = (title, body)=>{
    // to load data from JSON file
    const notes = loadData();

    // to check whether there is any duplicate in the title
    const duplicateNote = notes.find(((note)=>note.title === title));

    if (!duplicateNote){
        // add the given note in the existing notes object
        notes.push({
            title: title,
            body: body
        });

        // to save the updated data in the targeted JSON file
        saveData(notes);
        console.log(chalk.green.inverse("Your Note has been added successfully!"));
    }
    else{
        console.log(chalk.red.inverse("The title of your Note has been taken already!"));
    }
}

// to remove the targeted note
const removeNote = (title)=>{
    // to load data from JSON file
    const notes = loadData();

    // notes array after removing the targeted note
    const finalNotes = notes.filter((note)=>note.title !== title);

    if (finalNotes.length !== notes.length){
        // to save the updated data in the targeted JSON file
        saveData(finalNotes);
        console.log(chalk.green.inverse(`Note Removed of title '${title}'!`));
    }
    else{
        console.log(chalk.red.inverse('Note not found!'));
    }
}

// to list down all the saved notes titles
const listNotes = ()=>{
    const notes = loadData();
    console.log(chalk.cyanBright.bold.underline('Your Notes'));
    notes.forEach((note,index)=>{
        console.log(chalk.blue.italic(`Note ${index+1}: `) + chalk.cyan(note.title));
    });
}

// to read the targeted note
const readNote = (title)=>{
    const notes = loadData();

    const noteToRead = notes.find(note=>note.title===title);

    if (noteToRead){
        console.log(chalk.blueBright.italic('Note Title: ') + chalk.cyan.italic(noteToRead.title));
        console.log(chalk.blueBright.italic('Note Body: ') + chalk.cyan(noteToRead.body));
    }
    else{
        console.log(chalk.red.inverse(`No note found with the title '${title}'`));
    }
}



// // Utillity functions
// to load/read data from the JSON file
const loadData = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

// to save data in the targeted JSON file
const saveData = (notes)=>{
    const dataJSON = JSON.stringify(notes);

    fs.writeFileSync('notes.json', dataJSON);
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
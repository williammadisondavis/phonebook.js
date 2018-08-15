var rl = require('readline');
var fs = require('fs');
var phonebook = []

const myInterface = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var menu = function() {
    console.log('   | ===============================================|');
    console.log('   | DIGITAL PHONEBOOK                              |');
    console.log('   | ===============================================|');
    console.log('   | To read the phonebook, press 1.                |');
    console.log('   | To add to the phonebook, press 2.              |');
    console.log('   | To delete from the phonebook, press 3.         |');
    console.log('   | To look up a contact in the phonebook, press 4.|');
    console.log('   | To save and exit, press 5.                     |')
    console.log('   |================================================|');

    myInterface.question('PRESS NUMBER, FOLLOWED BY ENTER, TO USE PHONEBOOK\n', function(response) {
        if (response == 1) {
            displayBook();
        } else if (response == 2) {
            addContact();
        } else if (response == 3) {
            removeContact();
        } else if (response == 4) {
            lookUpContact();
        } else if (response == 5) {
            savePhonebook();
        } else {
            console.log('You pressed something invalid! Try again!\n');
            menu();
        }
    })
};

var displayBook = function() {
    console.log(phonebook);
    menu();
};

var importPhonebook = function() {
        fs.readFile('phonebook.txt', 'utf-8', function(err, fileContents) {
        if (err) {
            console.log('you made a poopoo 💩!')
        } else {
            phonebook = JSON.parse(fileContents);
        };
    menu();
    });
}

importPhonebook();

var addContact = function() {
    myInterface.question('What is the FIRST name of the person you want to add?\n', function(firstNameResponse) {
        myInterface.question('What is the LAST name of the person you want to add?\n', function(lastNameResponse) {
            myInterface.question('What is the phone # of the person you want to add?\n', function(phoneNumResponse) {
                var newContact = {
                    firstName: firstNameResponse,
                    lastName: lastNameResponse,
                    phoneNumber: phoneNumResponse,
                };
                phonebook.push(newContact);
                    // possible save phonebook here
                menu();
            });
        });
    });
};

var savePhonebook = function() {
    var phonebookString = JSON.stringify(phonebook);
    fs.writeFile('phonebook.txt', phonebookString, function(err) {
        if (err) {
            console.log('error');
            menu();
        } else {
            console.log('Phonebook successfully saved!!')
            myInterface.close();
            process.stdin.destroy();
        };
    });
};

var removeContact = function() {
    myInterface.question('What is the FIRST name of the person you want to delete?\n', function(response) {
        var phonebookEdit = phonebook.filter(name => name.firstName !== response);
        phonebook = phonebookEdit;
        menu();
    });
};

var lookUpContact = function() {

};
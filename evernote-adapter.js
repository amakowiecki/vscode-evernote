'use strict'

const Evernote = require('evernote');
const vscode = require('vscode');
const config = vscode.workspace.getConfiguration("evernote");

const MAX_QUERY_COUNT = 99; //TODO only get 99 notes of a notebook

let client, noteStore;

function showStatusBarMsg(msg) {
    vscode.window.setStatusBarMessage(msg, 1000);
}

function listNoteBooks() {
    showStatusBarMsg("Requesting notebooks......");
    
    client = new Evernote.Client({token: config.token});
    noteStore = client.getNoteStore(config.noteStoreUrl);
    return noteStore.listNotebooks();
}

function listAllNoteMetas(notebookGuid) {
    showStatusBarMsg("Requesting all note metas......");
    
    return noteStore.findNotesMetadata({notebookGuid}, 0, MAX_QUERY_COUNT, {includeTitle: true});
}

function getNoteContent(noteGuid) {
    showStatusBarMsg("Requesting note content......");
    
    return noteStore.getNoteContent(noteGuid);
}

function updateNoteContent(guid, title, content) {
    showStatusBarMsg("Updating note content......");
    
    return noteStore.updateNote({guid, title, content});
}

module.exports = {
    listNoteBooks,
    listAllNoteMetas,
    getNoteContent,
    updateNoteContent
};
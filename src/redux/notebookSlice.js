import { createSlice } from "@reduxjs/toolkit";


const notebookSlice = createSlice({
    name: "notebook",
    initialState: {
        notebooks: [],
        currentNotebookId: null,
        selectedNotebookId: null,
        formVisibility: false,
        selectedNoteIndex: null,
    },
    reducers: {
        addNotebook: (state, action) => {
            state.notebooks.push(action.payload)
        },
        removeNotebook: (state, action) => {
            state.filter(notebook => notebook.id !== action.payload)
        },

        addNoteToNotebook: (state, action) => {
            //action.payload will contain the selected notebook ID and the new note
            const { selectedNotebookId, newNote } = action.payload;
            const selectedNotebook = state.notebooks.find(notebook => notebook.id === selectedNotebookId);
            if (selectedNotebook) {
                selectedNotebook.notes.push(newNote);
            }

        },
        setSelectedNotebookId: (state, action) => {
            state.selectedNotebookId = action.payload;
        },

        showNotes: (state, action) => {
            const { notebookId } = action.payload;
            state.notebooks.find(notebook => notebook.id == notebookId);
        },

        setFormVisibility: (state, action) => {
            state.formVisibility = action.payload;
        },

        removeNote: (state, action) => {
            const { selectedNotebookId, selectedNoteIndex } = action.payload;
            const selectedNotebook = state.notebooks.find(notebook => notebook.id === selectedNotebookId);

            if (selectedNotebook) {
                selectedNotebook.notes.splice(selectedNoteIndex, 1)
            }
        },
        setselectedNoteIndex: (state, action) => {
            state.selectedNoteIndex = action.payload;
        },
        updateNote: (state, action) => {
            const { selectedNotebookId, selectedNoteIndex, updatedNote } = action.payload;
            const selectedNotebook = state.notebooks.find(notebook => notebook.id === selectedNotebookId);

            if (selectedNotebook && selectedNotebook.notes[selectedNoteIndex]) {
                //update the note with the updated note
                selectedNotebook.notes[selectedNoteIndex] = { ...selectedNotebook.notes[selectedNoteIndex], ...updatedNote }
            }
        }

    }
})


export const { addNotebook, removeNotebook, addNoteToNotebook, setSelectedNotebookId, setFormVisibility, removeNote, setselectedNoteIndex, updateNote } = notebookSlice.actions;

export default notebookSlice.reducer;
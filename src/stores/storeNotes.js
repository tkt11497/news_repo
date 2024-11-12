import { defineStore } from 'pinia'
import { collection, getDocs,onSnapshot,
          addDoc, deleteDoc, doc, updateDoc,
          query, orderBy, limit } from "firebase/firestore";
import { db } from '@/js/firebase'
const notesCollection = collection(db, "notes")
// const notesQuery = query(notesCollection, orderBy("date"), limit(3));
const notesQuery = query(notesCollection, orderBy("date","desc"));
export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [

      ],
      notesloading: false
    }
  },
  actions: {
    async getNotes_reload() {
      let notes1 = []
      const querySnapshot = await getDocs(collection(db, "notes"));
      querySnapshot.forEach((doc) => {
        let note={
          id: doc.id,
          ...doc.data()
          }
        //console.log(doc.id, " => ", doc.data());
        notes1.push(note)
      });
      this.notes = notes1
    },
    async getNotes_subscribe() {  
      this.notesloading = true
      const unsub = onSnapshot(notesQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
            let note={
              id: doc.id,
              ...doc.data()
            }
            notes.push(note)
        });
        this.notes = notes
        this.notesloading = false
      });
      return unsub
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime()

      const docRef = await addDoc(notesCollection, {
        // content: newNoteContent.content,
        ...newNoteContent,
        date: currentDate
      });

      // this.notes.unshift(note)
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollection, idToDelete));
    },
    async updateNote(id_param, content) {
      // Set the "capital" field of the city 'DC'
      const { id, ...noteWithoutId } = content;
        await updateDoc(doc(db, "notes", id_param), {
          // content: content.content,
          // username: content.username only specified field will be updated in fire store
          ...noteWithoutId
        });
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0]
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})
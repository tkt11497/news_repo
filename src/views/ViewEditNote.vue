<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent.content"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
      ref="addEditNoteRef"
    >
      <template #buttons>
        <button
          @click="$router.back()"
          class="button is-link is-light mr-2"
        >
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-link"
          :disabled="!noteContent.content"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>

/*
  imports
*/

  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRoute, useRouter } from 'vue-router'
  import AddEditNote from '@/components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '@/stores/storeNotes'

/*
  router
*/

  const route = useRoute()
  const router = useRouter()

/*
  store
*/

  const storeNotes = useStoreNotes()

/*
  note
*/

  const noteContent = ref({content:''})
  const {notes}= storeToRefs(storeNotes)
  const getNote_reload = async ()=>{
    if(notes.value.length === 0){
      storeNotes.getNotes_reload().then(()=>{
        noteContent.value = storeNotes.getNoteContent(route.params.id)
        console.log(notes.value,'22')
      })
    }else{
      noteContent.value = storeNotes.getNoteContent(route.params.id)
      console.log(notes.value,'23')
    }
  }
  onMounted(()=>{
    getNote_reload()
  })
    

/*
  save clicked
*/

  const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
  }

</script>
import { useState, useEffect } from 'react'
import AddButton from './components/AddButton'
import NoteForm from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  const addNote = () => {
    const newNote = { id: Date.now(), title: '', content: '' }
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    saveNotesToLocalStorage(updatedNotes)
  }

  const saveNote = (id, updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...updatedNote }
      }
      return note
    })
    setNotes(updatedNotes)
    saveNotesToLocalStorage(updatedNotes)
  }

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
    saveNotesToLocalStorage(updatedNotes)
  }

  return (
    <>
      <header className="flex justify-between items-center pt-[150px] pr-[150px] pb-0 pl-[150px]">
        <h1 className="text-4xl">Notes</h1>
        <AddButton onClick={addNote} />
      </header>
      <main className="flex flex-wrap justify-center gap-16 mt-10">
        {notes.map((note) => (
          <NoteForm
            key={note.id}
            initialTitle={note.title}
            initialContent={note.content}
            onSave={(updatedNote) => saveNote(note.id, updatedNote)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </main>
    </>
  )
}

export default App

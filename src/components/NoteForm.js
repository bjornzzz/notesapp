import { useState, useEffect } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

function NoteForm({ initialTitle, initialContent, onSave, onDelete }) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [isSaved, setIsSaved] = useState(false) // Initialize as false

  // unique IDs
  const titleId = uuidv4()
  const contentId = uuidv4()

  useEffect(() => {
    const savedNote = JSON.parse(localStorage.getItem('savedNote'))
    if (
      savedNote &&
      savedNote.title === initialTitle &&
      savedNote.content === initialContent
    ) {
      setIsSaved(true) // Set isSaved to true if note is already saved
    }
  }, [initialTitle, initialContent])

  const handleSave = () => {
    onSave({ title, content })
    setIsSaved(true) // Set isSaved to true when the note is saved
    localStorage.setItem('savedNote', JSON.stringify({ title, content }))
  }

  const handleDelete = () => {
    onDelete()
  }

  return (
    <div className="bg-yellow-200 rounded-lg p-4 max-w-xs relative">
      <input
        type="text"
        placeholder="Title"
        id={titleId}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 bg-transparent outline-none text-lg uppercase font-bold"
      />
      <textarea
        placeholder="Content"
        id={contentId}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-2 bg-transparent outline-none resize-none"
        rows={3}
      ></textarea>
      <div className="flex justify-between items-center">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Save Note
        </button>
        {isSaved && (
          <AiOutlineCheckCircle className="text-black absolute top-0 right-0 mt-5 mr-3 text-lg" />
        )}
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash className="text-lg" />
        </button>
      </div>
    </div>
  )
}

export default NoteForm

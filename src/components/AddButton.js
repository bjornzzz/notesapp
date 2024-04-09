import { FiPlus } from 'react-icons/fi'

function AddButton({ onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      onClick={onClick}
    >
      <FiPlus className="mr-2" />
      Add Note
    </button>
  )
}

export default AddButton

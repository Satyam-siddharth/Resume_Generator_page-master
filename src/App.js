import React, {useState} from 'react'
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import './App.css'
import {DragHandle, Edit, Info} from '@mui/icons-material'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const sectionsList = [
  {
    id: 'profile-summary',
    name: 'Profile Summary',
    enabled: true,
    description: 'Your Profile Summary',
  },
  {
    id: 'academic',
    name: 'Academic and Cocurricular Achievements',
    enabled: true,
    description: 'Your academic',
  },
  {
    id: 'intern',
    name: 'Summer Internship Experience',
    enabled: true,
    description: 'Your intern',
  },
  {
    id: 'work-experience',
    name: 'Work Experience',
    enabled: true,
    description: 'Your work experience',
  },
  {
    id: 'projects',
    name: 'Projects',
    enabled: true,
    description: 'Your projects',
  },
  {
    id: 'certificate',
    name: 'Certifications',
    enabled: true,
    description: 'Your certificate',
  },
  {
    id: 'leader',
    name: 'Leadership Positions',
    enabled: true,
    description: 'Your position',
  },
  {
    id: 'extra',
    name: 'Extracurricular',
    enabled: true,
    description: 'Your extracurriculum',
  },
  {
    id: 'education',
    name: 'Education',
    enabled: true,
    description: 'Your educational background',
  },
  
  // Add more sections as needed
]

const App = () => {
  const [sections, setSections] = useState(sectionsList)
  const [hasChanges, setHasChanges] = useState(false)
  const [editableSectionId, setEditableSectionId] = useState(null)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const draggedSection = sections[result.source.index]
    const updatedSections = [...sections]
    updatedSections.splice(result.source.index, 1)
    updatedSections.splice(result.destination.index, 0, draggedSection)
    setSections(updatedSections)
    setHasChanges(true)
  }

  const handleNameChange = (sectionId, newName) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? {...section, name: newName} : section,
    )
    setSections(updatedSections)
    setHasChanges(true)
  }

  const handleToggle = (sectionId) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {...section, enabled: !section.enabled}
        : section,
    )
    setSections(updatedSections)
    setHasChanges(true)
  }

  const handleSave = () => {
    // Handle saving changes
    setHasChanges(false)
  }

  const handleEditClick = (sectionId) => {
    setEditableSectionId(sectionId)
  }

  const handleEditInputChange = (event) => {
    const sectionId = editableSectionId
    const newName = event.target.value
    handleNameChange(sectionId, newName)
  }

  return (
    <div className='Container'>
      <Typography variant="h4">Select your Selections</Typography>
      <DragDropContext className="listContainer" onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections-list">
          {(provided) => (
            <List className="sections-list" ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <ListItemIcon {...provided.dragHandleProps}>
                        <DragHandle />
                      </ListItemIcon>
                      <IconButton>
                          <Info />
                        </IconButton>
                      {editableSectionId === section.id ? (
                        <TextField
                          fullWidth
                          value={section.name}
                          onChange={handleEditInputChange}
                          onBlur={() => setEditableSectionId(null)}
                        />
                      ) : (
                        <ListItemText primary={section.name} />
                      )}
                      <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEditClick(section.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleToggle(section.id)}>
                          <Switch checked={section.enabled} />
                        </IconButton>
                     
                     
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <button disabled={!hasChanges} onClick={handleSave}>
        Save and Next
      </button>
    </div>
  )
}

export default App

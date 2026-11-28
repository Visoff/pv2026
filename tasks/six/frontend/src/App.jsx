import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

function App() {
  const [items, setItems] = useState([])
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')

  function addItem(event) {
    event.preventDefault()
    const name = newName.trim()
    if (!name) return

    setItems((current) => [...current, { id: crypto.randomUUID(), name }])
    setNewName('')
  }

  function deleteItem(id) {
    setItems((current) => current.filter((item) => item.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function startRenaming(item) {
    setEditingId(item.id)
    setEditingName(item.name)
  }

  function saveName(event) {
    event.preventDefault()
    const name = editingName.trim()
    if (!name) return

    setItems((current) =>
      current.map((item) => (item.id === editingId ? { ...item, name } : item)),
    )
    setEditingId(null)
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ py: { xs: 4, sm: 6 } }}>
        <Container maxWidth="sm">
          <Stack spacing={3}>
            <Typography variant="h4" component="h1">
              Список
            </Typography>

            <Stack
              component="form"
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center' }}
              onSubmit={addItem}
            >
              <TextField
                label="Новый элемент"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                size="small"
                fullWidth
                autoComplete="off"
              />
              <Button type="submit" variant="contained" disabled={!newName.trim()}>
                Добавить
              </Button>
            </Stack>

            {items.length === 0 ? (
              <Paper variant="outlined">
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">Список пуст.</Typography>
                </Box>
              </Paper>
            ) : (
              <Paper variant="outlined">
                <List disablePadding>
                  {items.map((item) => (
                    <ListItem key={item.id} divider>
                      {editingId === item.id ? (
                        <Stack
                          component="form"
                          direction="row"
                          spacing={1}
                          onSubmit={saveName}
                          sx={{ alignItems: 'center', flexGrow: 1 }}
                        >
                          <TextField
                            label="Название"
                            value={editingName}
                            onChange={(event) => setEditingName(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Escape') setEditingId(null)
                            }}
                            size="small"
                            fullWidth
                            autoFocus
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            disabled={!editingName.trim()}
                          >
                            Сохранить
                          </Button>
                          <Button size="small" onClick={() => setEditingId(null)}>
                            Отмена
                          </Button>
                        </Stack>
                      ) : (
                        <>
                          <ListItemText primary={item.name} />
                          <Stack direction="row" spacing={0.5}>
                            <Button size="small" onClick={() => startRenaming(item)}>
                              Изменить
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              onClick={() => deleteItem(item.id)}
                            >
                              Удалить
                            </Button>
                          </Stack>
                        </>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default App

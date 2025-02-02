import {
  Card,
  CardHeader,
  CardMedia,
  Paper,
  Box,
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import agent from 'app/api/agent'
import useProducts from 'app/hooks/useProducts'
import { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from 'app/store/configureStore';
import { fetchFilters } from 'features/catalog/catalogSlice';

export const ProductTypes = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editedName, setEditedName] = useState('')
  const { productTypes } = useProducts()
  const dispatch = useAppDispatch()

  const handleSave = async () => {
    const data = { name: editedName }
    if (editedName === '') return
    await agent.Admin.createProductType(data)
    dispatch(fetchFilters(0))
    setModalOpen(false)
  }
  const handleDelete = async (producer: string) => {
    await agent.Admin.deleteProductType(producer)
    dispatch(fetchFilters(0))
  }
  return (
    <Box sx={{padding: 5}}>
      <Card sx={{ width: 60, height: 60, marginBottom: 5 }} onClick={() => setModalOpen(true)}>
        <CardHeader
          title={'+'}
          sx={{ maxHeight: 20, bgcolor: 'background.paper' }}
          titleTypographyProps={{
            sx: { textAlign: 'center', color: 'neutral.darker' },
          }}
        />
        <CardMedia
          component={Paper}
          sx={{
            height: 180,
            backgroundSize: 'cover',
          }}
          image={''}
          title={''}
        />
      </Card>
      {productTypes?.map((e) => (
             <Box key={e} sx={{ display: 'flex', flexDirection: 'row'}}>
        <Box sx={{ border: '1px solid black', width: 100 }}>
          <Typography style={{ textAlign: 'center' }}>{e}</Typography>
        </Box>
        <Button sx={{padding: 0, minWidth: 0}} onClick={() => handleDelete(e)}>
          <DeleteForeverIcon color='error' />
          </Button>
        </Box>
      ))}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Edit Product Type</DialogTitle>
        <DialogContent>
          <TextField
            label='Title'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            margin='normal'
          />
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

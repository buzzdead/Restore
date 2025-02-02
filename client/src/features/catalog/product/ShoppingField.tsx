import { LoadingButton } from '@mui/lab'
import { Grid, TextField } from '@mui/material'
import { BasketItem } from 'app/models/basket'
import React from 'react'

interface Props {
  newQuantity: number | string
  handleUpdateCart: () => void
  updateState: (newQuantity: 'newQuantity', n: number | string) => void
  basketItem: BasketItem | undefined
  status: string
}

export const ShoppingField = ({
  newQuantity,
  handleUpdateCart,
  updateState,
  basketItem,
  status,
}: Props) => {

  const quantityChanged =  basketItem?.quantity === newQuantity || (!basketItem && newQuantity === 0)

    function handleInputChange(event: any) {
      console.log(event.target.value)
       parseInt(event.target.value) >= 0 ? updateState('newQuantity', parseInt(event.target.value)) : updateState('newQuantity', '')
    }

  return (
    <Grid xs={12} item sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
      <Grid item xs={6} md={6}>
        <TextField
          variant='outlined'
          type='number'
          label='Quantity in Cart'
          onChange={handleInputChange}
          autoComplete='off'
          fullWidth
          value={newQuantity}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <LoadingButton
          disabled={newQuantity === '' || quantityChanged}
          loading={status.includes('pending')}
          onClick={handleUpdateCart}
          sx={{ height: '55px' }}
          color='primary'
          size='large'
          variant='contained'
          fullWidth
        >
          {basketItem ? 'Update Quantity' : 'Add to cart'}
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

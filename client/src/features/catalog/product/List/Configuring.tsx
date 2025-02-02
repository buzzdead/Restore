import { useConfigs } from 'app/hooks/useConfigs'
import { Basket } from 'app/models/basket'
import { IProduct } from 'app/models/product'
import { ProductConfigs } from '../ProductConfigs'
import { Box, Typography } from '@mui/material'
import { ShoppingField } from '../ShoppingField'
import { addBasketItemAsync, removeBasketItemAsync } from 'features/basket/basketSlice'
import { useAppDispatch } from 'app/store/configureStore'
import React, { useEffect } from 'react'

interface Props {
  basket: Basket | null
  product: IProduct
  status: string
  modal?: boolean
}

export const Configuring = React.forwardRef(
  ({ basket, product, status, modal = false }: Props, ref) => {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }
    const { state, setState, updateState } = useConfigs({
      basket: basket,
      product: product,
      id: undefined,
    })
    const dispatch = useAppDispatch()
    const isInvalidQuantity = (quantity: number) => {
      return typeof quantity !== 'number' || quantity < 0
    }
    function handleUpdateCart() {
      const newQuantity = state.newQuantity as number
      if (isInvalidQuantity(newQuantity)) {
        updateState('newQuantity', state.basketItem?.quantity || 0)
        return
      }
      
      const quantity = Math.abs(newQuantity - (state.basketItem?.quantity || 0))
      const productId: number = product?.id as number
      const addToCart =
        !state.basketItem || (state.newQuantity as number) > state.basketItem.quantity

      addToCart
        ? dispatch(addBasketItemAsync({ productId, quantity, configId: state.config?.id }))
        : dispatch(removeBasketItemAsync({ productId, quantity, configId: state.config?.id }))
    }
   

    return (
      <Box sx={style}>
        <Typography sx={{  justifyContent: 'center', display: 'flex' }} variant='h4'>
          {product.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            style={{ margin: 30, marginBottom: 40 }}
            width={250}
            src={
              product.configurables?.find((e) => e.id === state.config?.id)?.images[0].pictureUrl
            }
          />
          <ProductConfigs
            product={product}
            modal={modal}
            updateState={setState}
            config={state.config}
            basket={basket}
          />
          <ShoppingField
            newQuantity={state.newQuantity as number}
            status={status}
            handleUpdateCart={handleUpdateCart}
            updateState={(newQuantity: 'newQuantity', n: number | string) =>
              updateState(newQuantity, n)
            }
            basketItem={state.basketItem}
          />
        </Box>
      </Box>
    )
  },
)

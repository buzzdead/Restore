import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material'
import { IProduct } from '../../app/models/product'
import React from 'react'
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { currencyFormat } from '../../app/util/util'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { addBasketItemAsync } from '../basket/basketSlice'

interface Props {
  product: IProduct
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'green' }}>{product.name.charAt(0).toUpperCase()}</Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
          bgcolor: 'primary.light',
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' color='secondary'>
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status === ('pendingAddItem' + product.id)} onClick={() => dispatch(addBasketItemAsync({productId: product.id, quantity: 1}))} size='small'>
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size='small'>
          View
        </Button>
      </CardActions>
    </Card>
  )
}

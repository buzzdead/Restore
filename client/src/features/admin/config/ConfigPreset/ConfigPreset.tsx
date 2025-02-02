import {
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Box,
  Paper,
} from '@mui/material'
import { useState } from 'react'
import CheckboxButtons from '../../../../app/components/AppCheckBox/CheckboxButtons'
import Render from '../../../../app/layout/Render'
import { IConfigPresetComposition } from './ConfigDialog'

interface Props {
  items: IConfigPresetComposition[]
  value?: string
  label: string
  loading?: boolean
  onChange: (configPresets: IConfigPresetComposition) => void
}

export default function ConfigPreset(props: Props) {
  const [currentKey, setCurrentKey] = useState<IConfigPresetComposition['key']>('Select key')
  const [currentValue, setCurrentValue] = useState<IConfigPresetComposition['configurations']>([
    { key: '', value: '' },
  ])

  const handleOnChange = (e: SelectChangeEvent<string>, key: boolean) => {
    setCurrentKey(e.target.value)
  }
  const findKey = (items: IConfigPresetComposition[], currentKey: string) => {
    return items.find((item) => item.key === currentKey)?.key || '';
  };
  
  const mapConfigurations = (checkedItems: string[]) => {
    return checkedItems.map((item) => {
      return { key: findKey(props.items, currentKey), value: item };
    });
  };
  
  const handleCheckBoxOnChange = (items: string[]) => {
    const checkedItems = items.filter((e) => e !== '')
    const configPreset: IConfigPresetComposition = {
      id: props.items.find((e) => e.key === currentKey)?.id || 0,
      key: currentKey,
      configurations: mapConfigurations(checkedItems),
    }
    props.onChange(configPreset)
    setCurrentValue(configPreset.configurations)
  }
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          defaultValue='Select key'
          value={currentKey}
          label={props.label}
          onChange={(e) => handleOnChange(e, true)}
        >
          <MenuItem key={-1} value={'Select key'}>
            Select Key
          </MenuItem>
          {props.items.map((item, index) => (
            <MenuItem key={index} value={item.key}>
              {item.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Render condition={currentKey !== 'Select key'}>
        <Box>
          <Paper variant='elevation' sx={{ padding: 2, borderColor: 'darkgreen', border: 1.5 }}>
            <CheckboxButtons
              flexRow
              checked={currentValue.map((e) => e.value)}
              onChange={(items) => handleCheckBoxOnChange(items)}
              items={
                props.items.find((e) => e.key === currentKey)?.configurations.map((e2) => e2.value)!
              }
            />
          </Paper>
        </Box>
      </Render>
    </Box>
  )
}

import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0'

import {PersonCard, PersonCardProps} from './PersonCard'

export default {
  title: 'Example/PersonCard',
  component: PersonCard,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as Meta

const Template: Story<PersonCardProps> = (args) => <PersonCard {...args} />

export const NameOnly = Template.bind({})
NameOnly.args = {
  name: 'Audrow',
}

export const NameAndPhone = Template.bind({})
NameAndPhone.args = {
  name: 'Audrow',
  phoneNumber: '555-555-5555',
}

export const NameAndEmail = Template.bind({})
NameAndEmail.args = {
  name: 'Audrow',
  email: 'audrow@hey.com',
}

export const NamePhoneAndEmail = Template.bind({})
NamePhoneAndEmail.args = {
  name: 'Audrow',
  phoneNumber: '555-555-5555',
  email: 'audrow@hey.com',
}

export const NamePhoneEmailAndBirthday = Template.bind({})
NamePhoneAndEmail.args = {
  name: 'Audrow',
  phoneNumber: '555-555-5555',
  email: 'audrow@hey.com',
  birthday: 'January 1, 1970',
}

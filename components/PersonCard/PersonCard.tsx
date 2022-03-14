import React from 'react'

export interface PersonCardProps {
  /**
   *  The full name of the person.
   */
  name: string
  /**
   *  The phone number of the person.
   */
  phoneNumber?: string
  /**
   *  The email address of the person.
   */
  email?: string
  /**
   *  The birthday of the person in the format of MM/DD/YYYY
   */
  birthday?: string
}

/**
 * Primary UI component for user interaction
 */
export const PersonCard: React.FC<PersonCardProps> = ({
  name,
  phoneNumber,
  email,
  birthday,
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <p>Name: {name}</p>
      {phoneNumber && <p>Phone: {phoneNumber}</p>}
      {email && <p>Email: {email}</p>}
      {birthday && <p>Birthday: {birthday}</p>}
    </>
  )
}

import React, { useEffect, useState } from "react";
import {Button} from "../Button/Button";
import { getUsers } from '../../services/userService';
import { Input } from "../Input/Input";

export const UserList = () => {
  const [people, setPeople] = useState<undefined | object[]>(undefined);
  
  useEffect(() => {
    
    const asyncFunction = async () => {
      const usersList = await getUsers();
      console.log(usersList + " prueba");
      setPeople(usersList);
    } 
    asyncFunction()
  }, []);


  if (!people) {
    console.log(people +" hola")
    return null;
  }

  // const onInputChange = (_people: object[]) => (text: string) => _people.filter((person: any) => person.name.includes(text))
  const onInputChange = (text: string, people: any) => {
    const peopleFiltered = [...people.filter((person: any) => person.name.includes(text))]
    setPeople(peopleFiltered)
  }

  return (
    <>
      <Input onChange={onInputChange}/>
      <ul>
        {people
          .map((person: any) => (
            <li key={person.id}>{person.name} </li>
          ))
        }
      </ul>
      <Button 
        text="Add" 
        onClick={() => setPeople([...people, {id: '20', name: 'Other User'}])} 
      />
    </>
  );
}

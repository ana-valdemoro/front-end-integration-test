import React, { useEffect, useState } from "react";
import {Button} from "../Button/Button";
import { getUsers } from '../../services/userService';

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

  return (
    <>
      <ul>
        {people.map((person: any) => (
          <li key={person.id}>{person.name} </li>
        ))}
      </ul>
      <Button 
        text="Add" 
        onClick={() => setPeople([...people, {id: '20', name: 'Other User'}])} 
      />
    </>
  );
}

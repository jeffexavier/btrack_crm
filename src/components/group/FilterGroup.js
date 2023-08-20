import { Button } from "@nextui-org/react";

export default function FilterGroup() {

  async function getFilteredGroups() {

    const filter = {
      name: {$regex: 'droga', options: 'i'}
    }

    const listFilteredGroups = await fetch(`/api/group/filter?filter=${JSON.stringify(filter)}`).then((response) => {
      return response.json()
    })
    console.log(listFilteredGroups)
  }



  return (
    <Button onPress={() => getFilteredGroups()}>teste</Button>
  )
}
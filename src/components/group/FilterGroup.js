import { ChevronDownIcon, MagnifyingGlassIcon } from "@/public/icons.js";
import { Button, Dropdown, Input } from "@nextui-org/react";
import { useState } from "react";

export default function FilterGroup({setGroups}) {
  
  const [filter, setFilter] = useState({
    name: {$regex: 'droga', $options: 'i'}
  })

  function onHandleInputFilter(e) {
    
    const newFilter = {...filter, name: {$regex: e.target.value, $options: "i"}}
    
    console.log(e.target.value);
    setFilter(newFilter);

    getFilteredGroups(newFilter)
  }

  function onHandleSizeFilter(e, name) {
    
    const newFilter = {...filter, [name]: {$regex: e, $options: "i"}}
    
    console.log(e, name);
    setFilter(newFilter);

    getFilteredGroups(newFilter)
  }

  async function getFilteredGroups(text) {

    const listFilteredGroups = await fetch(`/api/group/filter?filter=${JSON.stringify(text)}`).then((response) => {
      return response.json()
    })

    setGroups(listFilteredGroups.reverse())
    console.log(listFilteredGroups)
    console.log(filter)
  }



  return (
    <>
      <Input bordered color="secondary" aria-label="search input" type="text" labelLeft={<MagnifyingGlassIcon width="18px"/>} onChange={(e) => onHandleInputFilter(e)}/>
      {/* <Dropdown isBordered>
        <Dropdown.Trigger>
          <Button light flat color="secondary" icon={<ChevronDownIcon width="18px"/>}>CS</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu color="secondary">
          <Dropdown.Item>
            Agency Account
          </Dropdown.Item>
          <Dropdown.Item>
            Large Account
          </Dropdown.Item>
          <Dropdown.Item>
            Scale Account
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Dropdown isBordered>
        <Dropdown.Trigger>
          <Button light flat color="secondary" icon={<ChevronDownIcon width="18px"/>}>Porte</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu color="secondary" onAction={(e) => onHandleSizeFilter(e, 'size')}>
          <Dropdown.Item key="null">
            {""}
          </Dropdown.Item>
          <Dropdown.Item key="Agency Account">
            Agency Account
          </Dropdown.Item>
          <Dropdown.Item key="Large Account">
            Large Account
          </Dropdown.Item>
          <Dropdown.Item key="Scale Account">
            Scale Account
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown isBordered>
        <Dropdown.Trigger>
          <Button light flat color="secondary" icon={<ChevronDownIcon width="18px"/>}>Plano</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu color="secondary" onAction={(e) => onHandleSizeFilter(e, 'plan')}>
          <Dropdown.Item key="null">
            {""}
          </Dropdown.Item>
          {/* <Dropdown.Item key="Free">
            Free
          </Dropdown.Item>
          <Dropdown.Item key="Trial">
            Trial
          </Dropdown.Item>
          <Dropdown.Item key="POC">
            POC
          </Dropdown.Item>
          <Dropdown.Item key="Basic">
            Basic
          </Dropdown.Item>
          <Dropdown.Item key="Pro">
            Pro
          </Dropdown.Item> */}
          <Dropdown.Item key="Store">
            Store
          </Dropdown.Item>
          <Dropdown.Item key="Enterprise">
            Enterprise
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
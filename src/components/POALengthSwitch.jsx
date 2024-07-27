// components/POALengthSwitch.jsx
"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const POALengthSwitch = ({ isShort, setIsShort }) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="poa-length"
        checked={isShort}
        onCheckedChange={setIsShort}
      />
      <Label htmlFor="poa-length">Short POA</Label>
    </div>
  )
}

export default POALengthSwitch

import { PencilIcon, PlusIcon, TrashIcon, ChevronUpIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronDoubleDownIcon, HandThumbDownIcon, HandRaisedIcon, XMarkIcon, ChevronDoubleRightIcon, BuildingOffice2Icon, BuildingStorefrontIcon, BuildingOfficeIcon, EyeIcon, FireIcon, ClockIcon, RocketLaunchIcon, XCircleIcon, MinusIcon } from "@/public/icons.js"
import { Button, Modal, Tooltip, Text, Input, Dropdown, Textarea } from "@nextui-org/react"
import { useState, useEffect } from "react"
import formatDate from "@/src/backend/utils/formatDate.js"
import EditRevenueButton from "./EditRevenueButton.js"
import RevenueModal from "./RevenueModal.js"

import revenuePlans from './revenuePlans.js'
import { set } from "mongoose"

export default function OpenEditRevenueModalButton({revenueData, getRevenues}) {

  return (
      <RevenueModal revenueData={revenueData} isVisible={isVisible} setIsVisible={setIsVisible} getRevenues={getRevenues}/>
  )
}
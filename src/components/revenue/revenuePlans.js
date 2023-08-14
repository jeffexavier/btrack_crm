import { BuildingOffice2Icon, BuildingOfficeIcon, BuildingStorefrontIcon, ClockIcon, EyeIcon, RocketLaunchIcon } from "@/public/icons.js";

const plans = [
  {
    value: 'Free',
    color: 'error',
    icon: (width) => <EyeIcon width={width} />
  }, {
    value: 'Trial',
    color: 'warning',
    icon: (width) => <ClockIcon width={width} />
  }, {
    value: 'POC',
    color: 'warning',
    icon: (width) => <RocketLaunchIcon width={width} />
  }, {
    value: 'Basic',
    color: 'primary',
    icon: (width) => <BuildingStorefrontIcon width={width} />
  }, {
    value: 'Pro',
    color: 'success',
    icon: (width) => <BuildingOfficeIcon width={width} />
  }, {
    value: 'Enterpise',
    color: 'secondary',
    icon: (width) => <BuildingOffice2Icon width={width} />
  }
]

export default plans
import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
  IconUser,
  IconBuildingBank,
} from '@tabler/icons-react'
import DesktopIcon from "@/assets/side-bar/desktop.svg?react";
import EntrepriseIcon from "@/assets/side-bar/entreprise.svg?react";
import SubscriberIcon from "@/assets/side-bar/subscriber.svg?react";
import AdsIcon from "@/assets/side-bar/ads.svg?react";

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  // {
  //   title: 'Dashboard',
  //   label: '',
  //   href: '/',
  //   icon: <IconLayoutDashboard size={18} />,
  // },
  {
    title: 'Des bureaux',
    href: '/offices',
    icon: <DesktopIcon height={18} width={18} />,
  },
  {
    title: 'Entreprises',
    href: '/companies',
    icon: <EntrepriseIcon height={18} width={18} />,
  },
  {
    title: 'Abonnés',
    href: '/subscribers',
    icon: <SubscriberIcon height={18} width={18} />,
  },
  {
    title: 'Annonces',
    href: '/adv',
    icon: <AdsIcon height={18} width={18} />,
  },
  {
    title: 'Services',
    href: '/services',
    icon: <AdsIcon height={18} width={18} />,
  }
]

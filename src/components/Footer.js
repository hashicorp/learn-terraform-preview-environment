import Link from 'next/link'
import Image from 'next/image'
import imageLoader from '../../loader'

import Theme from 'components/Theme'

import InfoIcon from '@hashicorp/flight-icons/svg/info-16.svg'
import DocsIcon from '@hashicorp/flight-icons/svg/docs-link-16.svg'
import LearnIcon from '@hashicorp/flight-icons/svg/learn-link-16.svg'
import GitHubIcon from '@hashicorp/flight-icons/svg/github-16.svg'
import GlobeIcon from '@hashicorp/flight-icons/svg/globe-16.svg'

export default function Footer() {

  return (
    <footer className="flex flex-col items-center justify-center w-full px-8 bg-white/50 dark:bg-black/50 shadow-mid dark:shadow-highlight">
      <aside className="grid xl:grid-cols-2 gap-8 xl:gap-12 max-w-[1080px] w-full py-12">
        <div className="flex flex-col justify-center px-8 py-6 bg-white dark:bg-white/5 dark:text-white/90 rounded-xl shadow-high dark:shadow-highlight space-y-2">
          <h4 className="flex items-center space-x-2 font-medium text-lg">
            <span>What is HashiCups?</span>
          </h4>
          <p className="text-sm">HashiCups is a demo app for the HashiCorp stack. If you're seeing this page, your demo is up and running!</p>
        </div>
        <div className="rounded-xl shadow-high dark:shadow-highlight space-y-2 overflow-hidden">
          <ul className="flex flex-col md:flex-row xl:grid gap-px grid-cols-2 grid-rows-2 text-sm bg-gray-100 dark:bg-white/10">
            <ExternalLink label="Visit HashiCorp on Learn" icon={LearnIcon} url="http://learn.hashicorp.com" />
            <ExternalLink label="Visit HashiCorp Docs" icon={DocsIcon} url="#" />
            <ExternalLink label="Visit HashiCorp.com" icon={GlobeIcon} url="https://hashicorp.com" />
            <ExternalLink label="Browse on GitHub" icon={GitHubIcon} url="https://github.com/hashicorp-demoapp" />
          </ul>
        </div>
      </aside>
      <div className="flex justify-center w-screen bg-gray-100/50 dark:bg-black/50 py-8 shadow-mid dark:shadow-highlight">
        <div className="flex flex-col space-y-4 xs:space-y-0 xs:flex-row items-center justify-between max-w-[1080px] px-8 w-full">
          <p className="text-sm text-black/75 dark:text-white/75">{Copyright()}. <span className="opacity-50">All rights reserved.</span></p>
          <Theme />
        </div>
      </div>
    </footer>
  )
}

function ExternalLink(props) {
  return (
    <li className="flex flex-auto">
      <Link href={props.url}>
        <a className="flex items-center space-x-2 flex-1 px-8 py-6 bg-white dark:bg-black/30 hover:bg-gray-50 dark:hover:bg-black/20 dark:text-white/90 transition ease-in-out">
          <span className="flex items-center opacity-75 flex-shrink-0 dark:invert"><Image src={props.icon} loader={imageLoader} unoptimized /></span>
          <span>{props.label}</span>
        </a>
      </Link>
    </li>
  )
}

function Copyright() {
  let newDate = new Date()
  let year = newDate.getFullYear();

  return `© ${year} HashiCorp`
}
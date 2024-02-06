/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { trackingLink } from '../variables'
import { AnchorHTMLAttributes } from 'react'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  // construct full url for internal links by using the new URL and current location
  const origin = process.env.NEXT_PUBLIC_URL
  console.log('origin', origin)
  const link = origin + href
  const url = link.toString()
  if (isInternalLink) {
    if (origin === 'http://localhost:3000') {
      return <Link href={href} {...rest} />
    } else {
      return <a href={`${trackingLink}${url}`} {...rest} />
    }
  }

  if (isAnchorLink) {
    return <a href={`${trackingLink}${url}`} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
